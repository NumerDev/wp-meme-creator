import { useRef } from "react";
import { useCreatorContext } from "../../context/ImageContext/useCreatorContext";
import Canvas from "../Canvas/Canvas";
import Card from "../Card/Card";
import "./MemeCanvas.css";

const MemeCanvas = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const { image, handleImage } = useCreatorContext();

  const handleUploadClick = () => {
    imageInput.current?.click();
  };

  return (
    <Card>
      <input
        className={"image__upload"}
        type="file"
        accept="image/*"
        ref={imageInput}
        onChange={handleImage}
      />
      {image ? (
        <Canvas />
      ) : (
        <button className="custom__file" onClick={handleUploadClick}>
          <p>Wybierz obraz lub</p>
          <p>kliknij na jeden z listy poniżej</p>
        </button>
      )}
    </Card>
  );
};

export default MemeCanvas;
