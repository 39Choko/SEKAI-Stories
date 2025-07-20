import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

const SidebarSelect: React.FC = () => {
    const settings = useContext(SettingsContext);

    if (!settings) return;

    const { openedSidebar, setOpenedSidebar } = settings;

    return (
        <div className="absolute flex-vertical" id="sidebar-select">
            <button
                onClick={() => {
                    setOpenedSidebar("background");
                }}
                className={`btn-circle ${
                    openedSidebar == "background" ? "btn-orange" : "btn-white"
                }`}
            >
                <i className="sidebar__select bi bi-card-image"></i>
            </button>
            <button
                onClick={() => {
                    setOpenedSidebar("text");
                }}
                className={`btn-circle ${
                    openedSidebar == "text" ? "btn-orange" : "btn-white"
                }`}
            >
                <i className="sidebar__select bi bi-chat"></i>
            </button>
            <button
                onClick={() => {
                    setOpenedSidebar("model");
                }}
                className={`btn-circle ${
                    openedSidebar == "model" ? "btn-orange" : "btn-white"
                }`}
            >
                <i className="sidebar__select bi bi-person-fill"></i>
            </button>
            <button
                onClick={() => {
                    setOpenedSidebar("animation");
                }}
                className={`btn-circle ${
                    openedSidebar == "animation" ? "btn-orange" : "btn-white"
                }`}
            >
                <i className="sidebar__select bi bi-film"></i>
            </button>
        </div>
    );
};

export default SidebarSelect;
