import React from "react";
import { IAnimationData } from "../types/IAnimationFrame";

interface FramesProps {
    type: string;
    data: IAnimationData;
    selected: boolean;
    index: number;
    onSelect: (index: number) => void;
}

const Frames: React.FC<FramesProps> = ({
    type,
    data,
    selected,
    index,
    onSelect,
}) => {
    return (
        <div
            className={selected ? "frames frames_selected" : "frames"}
            onClick={() => onSelect(index)}
        >
            <h3>{type}</h3>
            {type === "SceneText" && "sceneText" in data && (
                <p>Scene: {data.sceneText}</p>
            )}
            {type === "Talk" && "nameTag" in data && (
                <>
                    <p>Name Tag: {data.nameTag}</p>
                    <p>Dialogue: {data.dialogue}</p>
                    <p>
                        Models talking:{" "}
                        {data.models
                            .filter((m) => m.opacity != 0)
                            .map((m) => (
                                <span>{m.key} |</span>
                            ))}
                    </p>
                </>
            )}
        </div>
    );
};

export default Frames;
