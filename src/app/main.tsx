import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DialogsProvider } from "@/shared/ui/ui-dialog";
import { AppLayout } from "@/widgets/app-layout";

// Полифил process.nextTick для библиотек Node в браузере

window.process = window.process || {};
window.process.nextTick = (cb: (...args: unknown[]) => void, ...args: unknown[]) => {
  return setTimeout(() => cb(...args), 0);
};

createRoot(document.getElementById("root")!).render(
  <DialogsProvider>
    <BrowserRouter>
      <AppLayout>
        <App />
      </AppLayout>
    </BrowserRouter>
  </DialogsProvider>,
);
