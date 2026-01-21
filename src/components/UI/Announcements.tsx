import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { announcementKey } from "../../utils/Constants";

const Announcements: React.FC = () => {
    const context = useContext(SettingsContext);

    if (!context) return;

    const { setShowAnnouncements } = context;

    const handleAnnouncements = () => {
        setShowAnnouncements(false);
        const cookie = localStorage.getItem(announcementKey);
        if (!cookie) {
            localStorage.setItem(announcementKey, "0");
            return;
        }
        localStorage.setItem(announcementKey, `${Number(cookie) + 1}`);
    };

    return (
        <div id="announcements" onClick={handleAnnouncements}>
            <h2>Notice</h2>
            <p>A few minor updates have been done.</p>
            <ul>
                <li>Idle Animation is now disabled by default.</li>
                <li>
                    Added a toggle to show the notice announcement on
                    Settings.
                </li>
                <li>
                    Removed the guidelines and experimental toggle on Settings.
                </li>
                <li>
                    Replaced the Live2D issue message on certain models. This
                    can be removed by just tapping or clicking.
                </li>
                <li>
                    Updated Thai, Polish, and Filipino translations
                </li>
            </ul>
            <p>With the recent update of MYSEKAI, I am currently planning to make a textbox variant for this!</p>
            <p>Tap this section to close.</p>
        </div>
    );
};

export default Announcements;
