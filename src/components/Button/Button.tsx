import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick(): void;
  variant?: "primary" | "secondary";
}
const Button = ({
  text,
  onClick,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const variantClass = variant === "primary" ? "primary" : "secondary";

  return (
    <button className={`button ${variantClass}`} onClick={onClick} {...props}>
      {text}
    </button>
  );
};

export default Button;
