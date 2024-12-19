import "./Card.css";

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className="card__wrapper">{children}</div>;
};

export default Card;
