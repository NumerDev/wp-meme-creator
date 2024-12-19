import Editor from "../../components/Editor/Editor";
import MemeCanvas from "../../components/MemeCanvas/MemeCanvas";
import TemplateSection from "../../components/TemplateSection/TemplateSection";
import "./MemeCreator.css";

const MemeCreator = () => {
  return (
    <main className="meme__creator__wrapper">
      <section className="meme__creator__section">
        <MemeCanvas />
        <Editor />
      </section>
      <section>
        <TemplateSection />
      </section>
    </main>
  );
};

export default MemeCreator;
