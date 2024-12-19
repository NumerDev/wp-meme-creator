import template_1 from "../../../public/template_1.png";
import template_2 from "../../../public/template_2.png";
import template_3 from "../../../public/template_3.png";
import template_4 from "../../../public/template_4.png";
import template_5 from "../../../public/template_5.png";
import { useCreatorContext } from "../../context/ImageContext/useCreatorContext";
import Card from "../Card/Card";
import "./TemplateSesction.css";

const TemplateSection = () => {
  const { handleReset, handleImage } = useCreatorContext();

  const templates = [
    template_1,
    template_2,
    template_3,
    template_4,
    template_5,
  ];

  const handleLoadImage = (importedImage: string) => {
    handleReset("texts");
    handleImage(importedImage);
  };

  return (
    <Card>
      <section className="template__wrapper">
        {templates.map((template, index) => (
          <button
            key={index}
            className="template__button"
            onClick={() => handleLoadImage(template)}
          >
            <img src={template} alt={`template-${index + 1}`} />
          </button>
        ))}
      </section>
    </Card>
  );
};

export default TemplateSection;
