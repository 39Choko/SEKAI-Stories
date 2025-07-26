import React, { useContext, useState } from "react";
import { SceneContext } from "../../contexts/SceneContext";
import { IAnimationFrame, IAnimationTalk } from "../../types/IAnimationFrame";
import Frames from "../Frames";
import IModel from "../../types/IModel";
import { Live2DModel } from "pixi-live2d-display-mulmotion";

const AnimationSidebar: React.FC = () => {
    const scene = useContext(SceneContext);
    const [selectedType, setSelectedType] = useState<string>("sceneText");
    const [selectedFrame, setSelectedFrame] = useState<number>(-1);

    if (!scene) throw new Error("Context not found");

    const {
        animationFrames,
        setAnimationFrames,
        background,
        text,
        setText,
        sceneText,
        setSceneText,
        models,
        modelContainer,
        setModels,
    } = scene;

    if (!background || !text || !sceneText || !models || !modelContainer)
        return;
    const handleAddFrame = () => {
        let data: IAnimationFrame | IAnimationTalk | null = null;

        switch (selectedType) {
            case "sceneText":
                data = {
                    type: "SceneText",
                    data: {
                        sceneText: sceneText.textString,
                    },
                };
                break;
            case "talk":
                data = {
                    type: "Talk",
                    data: {
                        nameTag: text.nameTagString,
                        dialogue: text.dialogueString,
                        models: Object.fromEntries(
                            Object.entries(models).map(([key, e]) => [
                                key,
                                {
                                    x: e.modelX,
                                    y: e.modelY,
                                    scale: e.modelScale,
                                    rotation: e.modelRotation,
                                    pose: e.pose,
                                    expression: e.expression,
                                    opacity: e.model.alpha,
                                },
                            ])
                        ),
                    },
                };
                break;
            case "motion":
                data = {
                    type: "Motion",
                    data: {
                        dialogueVisible: text.visible,
                        models: Object.fromEntries(
                            Object.entries(models).map(([key, e]) => [
                                key,
                                {
                                    x: e.modelX,
                                    y: e.modelY,
                                    scale: e.modelScale,
                                    rotation: e.modelRotation,
                                    pose: e.pose,
                                    expression: e.expression,
                                    opacity: e.model.alpha,
                                },
                            ])
                        ),
                    },
                };
                break;
            case "background":
                data = {
                    type: "BackgroundChange",
                    data: {
                        backgroundFile: background.filename,
                    },
                };
                break;
        }

        if (!data) return;

        setAnimationFrames((prev) => [...prev, data]);
    };

    const handleSelectFrame = (index: number) => {
        setSelectedFrame(index);
        const frameData = animationFrames[index];
        const { type, data } = frameData;
        modelContainer.alpha = 1;
        text.textContainer.alpha = 1;
        sceneText.sceneTextContainer.alpha = 0;

        setSceneText({
            ...sceneText,
            visible: false,
        });
        setText({
            ...text,
            hideEverything: false,
        });

        switch (type) {
            case "SceneText":
                if ("sceneText" in data) {
                    modelContainer.alpha = 0;
                    text.textContainer.alpha = 0;
                    sceneText.sceneTextContainer.alpha = 1;
                    setSceneText({
                        ...sceneText,
                        visible: true,
                    });
                    setText({
                        ...text,
                        hideEverything: true,
                    });
                }
                break;
            case "Talk":
                if ("nameTag" in data) {
                    text.nameTag.text = data.nameTag;
                    text.dialogue.text = data.dialogue;
                    setText({
                        ...text,
                        hideEverything: false,
                        dialogueString: data.dialogue,
                        nameTagString: data.nameTag,
                    });

                    const listedModels: Record<string, IModel> = {};
                    Object.entries(models).forEach(([key, m]) => {
                        if (!(key in data.models)) {
                            m.model.alpha = 0;
                            listedModels[key] = {
                                ...m,
                                visible: false,
                            };
                            return;
                        }
                        listedModels[key] = {
                            ...m,
                            modelX: data.models[key].x,
                            modelY: data.models[key].y,
                            modelScale: data.models[key].scale,
                            modelRotation: data.models[key].rotation,
                            expression: data.models[key].expression,
                            pose: data.models[key].pose,
                            visible: data.models[key].opacity == 1,
                        };
                        m.model.position.set(
                            data.models[key].x,
                            data.models[key].y
                        );
                        m.model.scale.set(
                            data.models[key].scale,
                            data.models[key].scale
                        );
                        m.model.angle = data.models[key].rotation;
                        m.model.alpha = data.models[key].opacity;

                        if (m.model instanceof Live2DModel) {
                            if (data.models[key].expression != 99999) {
                                const manager =
                                    m.model.internalModel
                                        .parallelMotionManager[0];
                                manager.startMotion(
                                    "Expression",
                                    data.models[key].expression
                                );
                            }
                            if (
                                data.models[key].pose &&
                                data.models[key].pose !== 99999
                            ) {
                                const manager =
                                    m.model.internalModel
                                        .parallelMotionManager[1];
                                manager.startMotion(
                                    "Motion",
                                    data.models[key].pose
                                );
                            }
                        }
                    });
                    setModels(listedModels);
                }
                break;
        }
    };

    return (
        <div>
            <h1>Animation</h1>
            <div className="option">
                <h2>Type</h2>
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="sceneText">Scene Text</option>
                    <option value="talk">Talk</option>
                    <option value="motion">Motion</option>
                    <option value="background">Background Change</option>
                </select>
                <button
                    className="btn-extend-width btn-blue btn-regular"
                    onClick={handleAddFrame}
                >
                    Add Frame
                </button>
            </div>
            <div className="option">
                <h2>Playback</h2>
                <button className="btn-extend-width btn-blue btn-regular">
                    Play
                </button>
                <button className="btn-extend-width btn-blue btn-regular">
                    Next
                </button>
            </div>
            <div className="option">
                <h2>Frames</h2>
                {animationFrames.map((e: IAnimationFrame, idx) => (
                    <Frames
                        type={e.type}
                        data={e.data}
                        selected={idx == selectedFrame}
                        index={idx}
                        onSelect={handleSelectFrame}
                    />
                ))}
            </div>
            <div className="option">
                <h2>Lookup Table</h2>
                <div className="option__content">
                    <h3>Models</h3>
                    <table>
                        {models &&
                            Object.entries(models).map(([key, e]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{e.modelName}</td>
                                </tr>
                            ))}
                    </table>
                    <h3>Backgrounds</h3>
                </div>
            </div>
        </div>
    );
};

export default AnimationSidebar;

/* 
    types:
        1. Scene Text: hides everything except scene text
        2. Talk: Dialogue will be animated (like a typewriter) and dialogue box will always be on
        3. Layout Change: Change models layout (hidden option will fadein/fadeout)
        3. Motion: Animates the model using the transform. Also apply new emotion when changed.
        4. Background Change: Changes the background.
                              This will happen instantly. If you wish to change scenario, use fade in and fade out black first
        5. Fade in/out black: Fades from/to black. Auto hides the dialogue box.
        5. Fade in/out white: Fades from/to white. Auto hides the dialogue box.
*/
