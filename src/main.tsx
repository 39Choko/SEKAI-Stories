import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SceneProvider } from "./contexts/SceneProvider.tsx";
import { SidebarProvider } from "./contexts/SidebarProvider.tsx";
import i18nInit from "./utils/i18ninit.tsx";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import "./css/main.css";
import { SoftErrorProvider } from "./contexts/SoftErrorProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/UI/ErrorBoundary.tsx";

i18nInit();

createRoot(document.getElementById("root")!).render(
    <I18nextProvider i18n={i18n}>
        <SoftErrorProvider>
            <SceneProvider>
                <SidebarProvider>
                    <ErrorBoundary
                        fallbackRender={(props) => <ErrorFallback {...props} />}
                    >
                        <App />
                    </ErrorBoundary>
                </SidebarProvider>
            </SceneProvider>
        </SoftErrorProvider>
    </I18nextProvider>
);
