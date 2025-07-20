interface IAnimationSceneText {
    sceneText: string;
}
interface IAnimationTalk {
    nameTag: string;
    dialogue: string;
}

export interface IAnimationFrame {
    models: string[];
    type:
        | "SceneText"
        | "Talk"
        | "Motion"
        | "BackgroundChange"
        | "FadeInBlack"
        | "FadeOutBlack";
    data: IAnimationSceneText | IAnimationTalk;
}
