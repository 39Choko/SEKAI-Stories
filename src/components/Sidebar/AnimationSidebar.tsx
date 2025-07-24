import React, { useContext, useState } from "react";
import { SceneContext } from "../../contexts/SceneContext";
import { IAnimationFrame, IAnimationTalk } from "../../types/IAnimationFrame";
import Frames from "../Frames";

const AnimationSidebar: React.FC = () => {
    const scene = useContext(SceneContext);
    const [selectedType, setSelectedType] = useState<string>("sceneText");
    const [selectedFrame, setSelectedFrame] = useState<number>(0);

    if (!scene) throw new Error("Context not found");

    const {
        animationFrames,
        setAnimationFrames,
        background,
        text,
        sceneText,
        models,
    } = scene;

    const handleAddFrame = () => {
        let data: IAnimationFrame | IAnimationTalk | null = null;

        if (
            !background ||
            !text?.dialogue ||
            !text?.nameTag ||
            !sceneText?.textString ||
            !models
        )
            return;
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
                        models: Object.entries(models).map(([key, e]) => ({
                            key: key,
                            x: e.modelX,
                            y: e.modelY,
                            scale: e.modelScale,
                            rotation: e.modelRotation,
                            pose: e.pose,
                            expression: e.expression,
                            opacity: e.model.alpha,
                        })),
                    },
                };
                break;
            case "motion":
                data = {
                    type: "Motion",
                    data: {
                        dialogueVisible: text.visible,
                        models: Object.entries(models).map(([key, e]) => ({
                            key: key,
                            x: e.modelX,
                            y: e.modelY,
                            scale: e.modelScale,
                            rotation: e.modelRotation,
                            pose: e.pose,
                            expression: e.expression,
                            opacity: e.model.alpha,
                        })),
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

        switch (frameData.type) {
            case "SceneText":
                if ("sceneText" in frameData.data)
                    console.log(frameData.data.sceneText);
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
