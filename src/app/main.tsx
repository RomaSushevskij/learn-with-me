import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DialogsProvider } from "@/shared/ui/ui-dialog";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DialogsProvider>
  </StrictMode>,
);
