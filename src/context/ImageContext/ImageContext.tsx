import { createContext, useState } from "react";
import {
  CreateTextMetadata,
  CreatorContextProps,
  CreatorContextProviderProps,
  TextMetadata,
} from "./ImageContext.types";

// eslint-disable-next-line react-refresh/only-export-components
export const CreatorContext = createContext<CreatorContextProps>(
  {} as CreatorContextProps
);

const CreatorContextProvider = ({ children }: CreatorContextProviderProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [texts, setTexts] = useState<TextMetadata[]>([]);

  const addText = ({
    text,
    fontSize,
    fontFamily,
    color,
    background,
  }: CreateTextMetadata) => {
    setTexts((prev) => [
      ...prev,
      {
        id: `text-${prev.length + 1}`,
        text,
        x: 50,
        y: 50,
        fontSize,
        fontFamily,
        color,
        background,
      },
    ]);
  };

  const handleReset = (mode?: "image" | "texts") => {
    switch (mode) {
      case "image":
        setImage(null);
        break;
      case "texts":
        setTexts([]);
        break;
      default:
        setImage(null);
        setTexts([]);
        break;
    }
  };

  const handleUpdateTextPosition = (id: string, x: number, y: number) => {
    setTexts((prev) =>
      prev.map((text) => (text.id === id ? { ...text, x, y } : text))
    );
  };

  const handleImage = (
    source: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const img = new Image();
    if (typeof source === "string") {
      img.src = source;
    } else {
      const file = source.target.files?.[0];
      if (!file) return;
      img.src = URL.createObjectURL(file);
    }

    img.onload = () => setImage(img);
  };

  return (
    <CreatorContext.Provider
      value={{
        image,
        texts,
        setImage,
        setTexts,
        addText,
        handleReset,
        handleImage,
        handleUpdateTextPosition,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export { CreatorContextProvider };
