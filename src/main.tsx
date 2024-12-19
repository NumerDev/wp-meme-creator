import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CreatorContextProvider } from "./context/ImageContext/ImageContext.tsx";
import "./global.css";
import MemeCreator from "./views/MemeCreator/MemeCreator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreatorContextProvider>
      <MemeCreator />
    </CreatorContextProvider>
  </StrictMode>
);
