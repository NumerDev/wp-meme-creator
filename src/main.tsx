import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import MemeCreator from "./views/MemeCreator/MemeCreator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemeCreator />
  </StrictMode>
);
