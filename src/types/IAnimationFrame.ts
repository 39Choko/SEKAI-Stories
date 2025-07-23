import IModel from "./IModel";

export interface IAnimationSceneText {
    sceneText: string;
}
export interface IAnimationTalk {
    nameTag: string;
    dialogue: string;
    models: {
        index: number;
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
        index: number;
        x: number;
        y: number;
        scale: number;
        rotation: number;
        pose: number;
        expression: number;
    }[];
}

export interface IAnimationBackgroundChange {
    backgroundFile: string
}

export interface IAnimationFrame {
    type:
        | "SceneText"
        | "Talk"
        | "Motion"
        | "BackgroundChange"
        | "FadeInBlack"
        | "FadeOutBlack";
    data:
        | IAnimationSceneText
        | IAnimationTalk
        | IAnimationMotion
        | IAnimationBackgroundChange;
}

export interface IAnimationData {
    models: IModel[];
    backgrounds: string[];
    frames: IAnimationFrame[];
}
