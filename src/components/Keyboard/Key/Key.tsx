// Import types
import type { KeyProps } from "./Key.types";
// Import styles
import keyStyles from "./Key.module.css";

// Keyboard Key Component
const Key = ({ letter, onClick, isSpecial = false }: KeyProps) => {
  const handleClick = () => onClick(letter);

  const keyClass = isSpecial
    ? `${keyStyles.key} ${keyStyles.specialKey}`
    : keyStyles.key;

  return (
    <button className={keyClass} onClick={handleClick} type="button">
      {letter === "BACKSPACE" ? "⌫" : letter}
    </button>
  );
};

export default Key;
