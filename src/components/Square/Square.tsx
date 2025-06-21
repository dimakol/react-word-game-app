// Import types
import type { SquareProps } from "./Square.types";
// Import styles
import squareStyles from "./Square.module.css";

// Square Component
const Square = ({ letter, status }: SquareProps) => {
  const getSquareClass = () => {
    const className = squareStyles.square;

    switch (status) {
      case "correct":
        return `${className} ${squareStyles.correct}`;
      case "incorrect":
        return `${className} ${squareStyles.incorrect}`;
      default:
        return `${className} ${squareStyles.empty}`;
    }
  };

  return <div className={getSquareClass()}>{letter}</div>;
};

export default Square;
