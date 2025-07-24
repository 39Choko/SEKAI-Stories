import IModel from "./IModel";

export interface IAnimationSceneText {
    sceneText: string;
}
export interface IAnimationTalk {
    nameTag: string;
    dialogue: string;
    models: {
        key: string;
        x: number;
        y: number;
        scale: number;
        rotation: number;
        pose: number;
        expression: number;
        opacity: number;
    }[];
}

export interface IAnimationMotion {
    dialogueVisible: boolean;
    models: {
        key: string;
        x: number;
        y: number;
        scale: number;
        rotation: number;
        pose: number;
        expression: number;
    }[];
}

export interface IAnimationBackgroundChange {
    backgroundFile: string;
}

export type IAnimationData =
    | IAnimationSceneText
    | IAnimationTalk
    | IAnimationMotion
    | IAnimationBackgroundChange;

export interface IAnimationFrame {
    type:
        | "SceneText"
        | "Talk"
        | "Motion"
        | "BackgroundChange"
        | "FadeInBlack"
        | "FadeOutBlack";
    data: IAnimationData;
}
