import { useLayoutEffect, useRef } from "react";
import { useCreatorContext } from "../../context/ImageContext/useCreatorContext";
import Button from "../Button/Button";
import "./Canvas.css";
import { useCanvasCreator } from "./useCanvasCreator";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    renderCanvas,
    draggedTextId,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleSave,
  } = useCanvasCreator({ canvasRef });
  const { image, texts, handleReset } = useCreatorContext();

  useLayoutEffect(() => {
    renderCanvas();
  }, [image, texts, draggedTextId, renderCanvas]);

  return (
    <section className="canvas__wrapper">
      <div className="canvas__section__wrapper">
        <canvas
          role="img"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className={"canvas__navigation__wrapper"}>
        <Button variant="secondary" text={"Reset"} onClick={handleReset} />
        <Button text={"Pobierz"} onClick={handleSave} />
      </div>
    </section>
  );
};

export default Canvas;
