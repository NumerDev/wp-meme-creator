import { useContext } from "react";
import { CreatorContext } from "./ImageContext";

export const useCreatorContext = () => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error(
      "useCreatorContext must be used within a NavigationContextProvider"
    );
  }
  return context;
};
