import React, { useContext, useState } from "react";
import { SceneContext } from "../../contexts/SceneContext";
import {
    IAnimationFrame,
} from "../../types/IAnimationFrame";

const AnimationSidebar: React.FC = () => {
    const scene = useContext(SceneContext);
    const [selectedType, setSelectedType] = useState("sceneText");

    if (!scene) throw new Error("Context not found");

    const { animationFrames, setAnimationFrames, sceneText } = scene;

    const handleAddFrame = () => {
        let data: IAnimationFrame | null = null;

        switch (selectedType) {
            case "sceneText":
                if (!sceneText?.textString) return;
                data = {
                    type: "SceneText",
                    data: {
                        sceneText: sceneText.textString,
                    },
                };
                break;

            // Extend with other cases if needed...
        }

        if (!data) return;

        setAnimationFrames((prev) => [...prev, data]);
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
                    <option>Motion</option>
                    <option>Background Change</option>
                    <option>Fade-in to Black</option>
                    <option>Fade-out to Black</option>
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
            </div>
            <div className="option">
                <h2>Frames</h2>
            </div>
            <div className="option">
                <h2>Details</h2>
                <div className="option__content">
                    <h3>Initial Background</h3>
                    <h3>Models</h3>
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
