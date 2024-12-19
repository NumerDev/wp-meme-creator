import { useCallback, useState } from "react";
import { useCreatorContext } from "../../context/ImageContext/useCreatorContext";

interface CanvasCreatorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const useCanvasCreator = ({ canvasRef }: CanvasCreatorProps) => {
  const [draggedTextId, setDraggedTextId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { image, texts, handleUpdateTextPosition } = useCreatorContext();

  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cleanup
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const scale = Math.min(
        CANVAS_WIDTH / image.width,
        CANVAS_HEIGHT / image.height
      );
      const scaledWidth = image.width * scale;
      const scaledHeight = image.height * scale;

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        scaledWidth,
        scaledHeight
      );

      texts.forEach(
        ({ id, text, x, y, fontSize, color, background, fontFamily }) => {
          ctx.font = `${fontSize}px ${fontFamily || "Arial"}`;
          const textWidth = ctx.measureText(text).width;

          if (background) {
            ctx.fillStyle = background;
            ctx.fillRect(x - 4, y - fontSize - 4, textWidth + 8, fontSize + 16);
          }

          if (id === draggedTextId) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(
              x - 4,
              y - fontSize - 4,
              textWidth + 8,
              fontSize + 16
            );
          }

          ctx.fillStyle = color;
          ctx.fillText(text, x, y);
        }
      );
    }
  }, [canvasRef, image, texts, draggedTextId]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Teraz już pamiętam czym był intersection observer 😄
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const text of texts) {
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        ctx.font = `${text.fontSize}px ${text.fontFamily || "Arial"}`;
        const textWidth = ctx.measureText(text.text).width;
        const textHeight = text.fontSize;

        if (
          mouseX >= text.x &&
          mouseX <= text.x + textWidth &&
          mouseY >= text.y - textHeight &&
          mouseY <= text.y
        ) {
          setDraggedTextId(text.id);
          setOffset({ x: mouseX - text.x, y: mouseY - text.y });
          return;
        }
      }
    },
    [canvasRef, texts]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!draggedTextId) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      handleUpdateTextPosition(
        draggedTextId,
        mouseX - offset.x,
        mouseY - offset.y
      );
    },
    [draggedTextId, offset, canvasRef, handleUpdateTextPosition]
  );

  const handleMouseUp = () => {
    setDraggedTextId(null);
  };

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [canvasRef]);

  return {
    renderCanvas,
    draggedTextId,
    offset,
    setDraggedTextId,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleSave,
  };
};
