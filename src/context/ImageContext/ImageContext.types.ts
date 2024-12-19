export interface CreatorContextProps {
  image: HTMLImageElement | null;
  texts: TextMetadata[];
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
  setTexts: React.Dispatch<React.SetStateAction<TextMetadata[]>>;
  addText(text: CreateTextMetadata): void;
  handleImage(source: React.ChangeEvent<HTMLInputElement> | string): void;
  handleReset(mode?: "image" | "texts"): void;
  handleUpdateTextPosition(id: string, x: number, y: number): void;
}

export interface CreatorContextProviderProps {
  children: React.ReactNode;
}

export interface TextMetadata {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  background?: string;
}

export interface CreateTextMetadata {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  background?: string;
}
