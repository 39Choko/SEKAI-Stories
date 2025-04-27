import axios from "axios";
import { ILive2DModelList } from "../types/ILive2DModelList";
import { sekaiUrl } from "./URL";
import { IMotionsExpressions } from "../types/IMotionExpression";

// This code is mostly copied from SEKAI Viewer's Live2dLoader.
type ModelNameTransformer = (modelName: string) => string;
const modelNameToMotionBaseName: Record<string, ModelNameTransformer> = {
    // eg. v2_clb01_21miku to v2_21miku
    "v2_clb\\d{2}_.*": (modelName: string) =>
        modelName.replace(/v2_clb\d{2}_/, "v2_"),
    // eg. v2_20mizuki_culture_back to v2_20mizuki_back
    "(.*)(_.*)_back(\\d{2})?$": (modelName: string) =>
        modelName.replace(/(.*)(_.*)_back(\d{2})?$/, "$1_back"),
    // eg. 21miku01 to 21miku
    "(.*)\\d{2}$": (modelName: string) => modelName.replace(/\d{2}$/, ""),
};

export const GetMotionData = async (
    modelItem: ILive2DModelList
): Promise<[string, IMotionsExpressions]> => {
    const [motionUrl, motionBaseName] = await GetMotionUrl(modelItem);
    const response = await fetch(motionUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch motion data: ${response.statusText}`);
    }
    const motionRes: IMotionsExpressions = await response.json();

    return [motionBaseName, motionRes];
};

const getUrl = async (url: string): Promise<string> => {
    const headRes = await axios.head(url, {
        validateStatus: (status) => status < 500,
    });
    if (headRes.status <= 400) {
        return url;
    }
    return "";
};

async function GetMotionUrl(
    modelItem: ILive2DModelList
): Promise<[string, string]> {
    // try to find the correct motion data url
    let modelBaseName = modelItem.modelBase;
    let modelDir = modelItem.modelPath.split("/").slice(0, -1).join("/");
    if (modelDir.indexOf("v2/collabo/21_miku") !== -1) {
        modelDir = modelDir.replace("collabo", "main");
    }

    // case 1: get directly from model path + motion_base
    let modelUrl = await getUrl(
        `${sekaiUrl}/motion/${modelDir}/${modelBaseName}_motion_base/BuildMotionData.json`
    );

    // case 2: check if the motion name is in the map
    if (!modelUrl) {
        for (const [pattern, processor] of Object.entries(
            modelNameToMotionBaseName
        )) {
            const regExp = new RegExp(pattern);
            if (regExp.test(modelItem.modelBase)) {
                modelBaseName = processor(modelItem.modelBase);

                // try to get url
                modelUrl = await getUrl(
                    `${sekaiUrl}/motion/${modelDir}/${modelBaseName}_motion_base/BuildMotionData.json`
                );
                break;
            }
        }
    }

    // case 3: reduce the name until base name
    while (!modelUrl && modelBaseName.split("_").length > 1) {
        modelBaseName = modelBaseName.split("_").slice(0, -1).join("_");
        modelUrl = await getUrl(
            `${sekaiUrl}/motion/${modelDir}/${modelBaseName}_motion_base/BuildMotionData.json`
        );
    }

    // case 4: if not found, throw error
    if (!modelUrl) {
        throw new Error(
            `Motion data not found for ${modelItem.modelBase}/${modelItem.modelName}`
        );
    }

    return [modelUrl, `${modelDir}/${modelBaseName}_motion_base`];
}
