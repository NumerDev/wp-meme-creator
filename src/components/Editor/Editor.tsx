import { useState } from "react";
import { useCreatorContext } from "../../context/ImageContext/useCreatorContext";
import Button from "../Button/Button";
import Card from "../Card/Card";
import "./Editor.css";

const Editor = () => {
  const [textContent, setTextContent] = useState("");
  const [textColor, setTextColor] = useState("#FF0000");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textSize, setTextSize] = useState("24");
  const [textFamily, setTextFamily] = useState("Arial");
  const { addText, image } = useCreatorContext();

  const handleAddText = () => {
    if (!textContent) return;
    addText({
      text: textContent,
      fontSize: +textSize,
      fontFamily: textFamily,
      color: textColor,
      background: backgroundColor,
    });
    setTextContent("");
    setTextColor("#FF0000");
    setTextSize("24");
  };

  return (
    <Card>
      <section className="editor__wrapper">
        <div className="editor__settings">
          <header className="editor__header">
            <h2>Edytor</h2>
          </header>
          <textarea
            onChange={(e) => setTextContent(e.target.value)}
            value={textContent}
            className={"editor__text"}
            placeholder="Dodaj tekst"
          ></textarea>
          <div className="editor__option">
            <label className={"option__label"} htmlFor="option_fontFamily">
              Czcionka
            </label>
            <select
              className="fontFamily__picker"
              id="option_fontFamily"
              value={textFamily}
              onChange={(e) => setTextFamily(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div className="editor__option">
            <label className={"option__label"} htmlFor="option_textColor">
              Kolor tekstu
            </label>
            <input
              className="color__picker"
              id="option_textColor"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div className="editor__option">
            <label className={"option__label"} htmlFor="option_backgroundColor">
              Kolor tła
            </label>
            <input
              className="color__picker"
              id="option_backgroundColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <div className="editor__option">
            <label className={"option__label"} htmlFor="option_textSize">
              Rozmiar tekstu
            </label>
            <input
              min={1}
              max={100}
              id="option_textSize"
              className={"size__picker"}
              type="number"
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
            />
          </div>
        </div>
        <Button
          text={"Dodaj tekst"}
          onClick={handleAddText}
          disabled={!image}
        />
      </section>
    </Card>
  );
};

export default Editor;
