import React, { useContext, useState } from "react";
import { SceneContext } from "./SceneContext";
import * as PIXI from "pixi.js";
import { useEffect } from "react";
import IModel from "../types/IModel";
import IBackground from "../types/IBackground";
import IText from "../types/IText";
import ISceneText from "../types/ISceneText";
import IGuideline from "../types/IGuideline";
import { IJsonSave } from "../types/IJsonSave";
import { ISplitBackground } from "../types/ISplitBackground";
import { LoadScene } from "../utils/GetDefaultScene";
import { SoftErrorContext } from "./SoftErrorContext";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "./SettingsContext";
import { IFilter } from "../types/IFilter";
import { IAnimationFrame } from "../types/IAnimationFrame";

interface SceneProviderProps {
    children: React.ReactNode;
}

export const SceneProvider: React.FC<SceneProviderProps> = ({ children }) => {
    const softError = useContext(SoftErrorContext);
    const settings = useContext(SettingsContext);
    const { t } = useTranslation();

    if (!softError || !settings) throw new Error("Context not loaded");

    const { setErrorInformation } = softError;
    const { blankCanvas, setLoading } = settings;
    const [app, setApp] = useState<PIXI.Application | undefined>(undefined);
    const [models, setModels] = useState<Record<string, IModel> | undefined>(
        undefined
    );
    const [layers, setLayers] = useState<number>(1);
    const [nextLayer, setNextLayer] = useState<number>(1);
    const [modelContainer, setModelContainer] = useState<
        PIXI.Container | undefined
    >(undefined);
    const [currentModel, setCurrentModel] = useState<IModel | undefined>(
        undefined
    );
    const [currentKey, setCurrentKey] = useState<string>("");
    const [background, setBackground] = useState<IBackground | undefined>(
        undefined
    );
    const [splitBackground, setSplitBackground] = useState<
        ISplitBackground | undefined
    >(undefined);
    const [text, setText] = useState<IText | undefined>(undefined);
    const [sceneText, setSceneText] = useState<ISceneText | undefined>(
        undefined
    );
    const [filter, setFilter] = useState<IFilter | undefined>(undefined);
    const [guideline, setGuideline] = useState<IGuideline | undefined>(
        undefined
    );
    const [reset, setReset] = useState<number>(0);
    const [startingMessage, setStartingMessage] = useState<string>("");
    const [sceneJson, setSceneJson] = useState<IJsonSave | undefined>(
        undefined
    );
    const [animationFrames, setAnimationFrames] = useState<IAnimationFrame[]>(
        []
    );
    const [initialState, setInitialState] = useState<boolean>(true);

    const runCanvas = async () => {
        const blankCanvasCookie = localStorage.getItem("blankCanvas");

        const {
            app: initApplication,
            model,
            currentKey,
            currentModel,
            modelContainer,
            background,
            splitBackground,
            text,
            sceneText,
            filter,
            guideline,
        } = await LoadScene({
            app,
            setStartingMessage,
            setLoading,
            ...(blankCanvas || blankCanvasCookie === "true"
                ? { scene: "blank" }
                : {}),
        });

        setApp(initApplication);
        setModels(model);
        setCurrentKey(currentKey);
        setCurrentModel(currentModel);
        setModelContainer(modelContainer);
        setBackground(background);
        setSplitBackground(splitBackground);
        setText(text);
        setSceneText(sceneText);
        setFilter(filter);
        setGuideline(guideline);
        setStartingMessage("");
        setLayers(1);
        setInitialState(true);
    };

    useEffect(() => {
        runCanvas().catch((error) => {
            setErrorInformation(t("error.default-scene-fail"));
            console.error(error);
        });
    }, [reset]);

    return (
        <SceneContext.Provider
            value={{
                app,
                setApp,
                models,
                setModels,
                layers,
                setLayers,
                nextLayer,
                setNextLayer,
                currentKey,
                setCurrentKey,
                currentModel,
                setCurrentModel,
                modelContainer,
                setModelContainer,
                background,
                setBackground,
                splitBackground,
                setSplitBackground,
                text,
                setText,
                sceneText,
                setSceneText,
                filter,
                setFilter,
                sceneJson,
                setSceneJson,
                guideline,
                setGuideline,
                reset,
                setReset,
                startingMessage,
                setStartingMessage,
                animationFrames,
                setAnimationFrames,
                initialState,
                setInitialState,
            }}
        >
            {children}
        </SceneContext.Provider>
    );
};

// Load Sample Model from Static
// const [characterFolder, motionFolder] = await GetCharacterFolder(
//     initialScene["model"]
// );

// const model = await axios.get(
//     `${staticUrl}/model/${characterFolder}/${initialScene["model"]}/${initialScene["model"]}.model3.json`
// );
// const motion = await axios.get(
//     `${staticUrl}/motion/${motionFolder}/BuildMotionData.json`
// );

// const modelData = await GetModelDataFromStatic(
//     characterFolder,
//     initialScene["model"],
//     model.data,
//     motion.data
// );

// setStartingMessage("Fetching initial model from sekai-viewer...");

// Load Sample Model from sekai-viewer
// const getModel = await axios.get(
//     `${sekaiUrl}/model/${initialScene["model"].modelPath}/${initialScene["model"].modelFile}`
// );
// setStartingMessage(
//     "Fetching initial motion data from sekai-viewer..."
// );
// const [motionBaseName, motionData] = await GetMotionData(
//     initialScene["model"]
// );

// setStartingMessage("Fixing model data...");
// const modelData = await GetModelDataFromSekai(
//     initialScene["model"],
//     getModel.data,
//     motionData,
//     motionBaseName
// );

// setStartingMessage("Loading model texture...");
// await axios.get(
//     modelData.url + modelData.FileReferences.Textures[0]
// );
// setStartingMessage("Loading model moc3 file...");
// await axios.get(modelData.url + modelData.FileReferences.Moc, {
//     responseType: "arraybuffer",
// });
// setStartingMessage("Loading model physics file...");
// await axios.get(modelData.url + modelData.FileReferences.Physics);

// setStartingMessage("Putting new model...");
// const live2DModel = await Live2DModel.from(modelData, {
//     autoInteract: false,
// });
// live2DModel.scale.set(0.5);
// live2DModel.position.set(190, -280);

// modelContainer.addChildAt(live2DModel, 0);
// initApplication.stage.addChildAt(modelContainer, 2);
// setStartingMessage("Adding pose and emotion...");
// live2DModel.motion("Expression", 38);
// await new Promise((resolve) => setTimeout(resolve, 2000));
