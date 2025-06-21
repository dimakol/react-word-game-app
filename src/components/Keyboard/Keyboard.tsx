// Import components
import Key from "./Key/Key";
// Import types
import type { KeyboardProps } from "./Keyboard.types";
// Import styles
import keyboardStyles from "./Keyboard.module.css";

// Keyboard Component
const Keyboard = ({ onKeyPress }: KeyboardProps) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"];

  return (
    <div className={keyboardStyles.keyboardContainer}>
      <div className={keyboardStyles.keyboard}>
        <div className={keyboardStyles.keyboardRow}>
          {row1.map((key) => (
            <Key key={key} letter={key} onClick={onKeyPress} />
          ))}
        </div>
        <div className={keyboardStyles.keyboardRow}>
          {row2.map((key) => (
            <Key key={key} letter={key} onClick={onKeyPress} />
          ))}
        </div>
        <div className={keyboardStyles.keyboardRow}>
          {row3.map((key) => (
            <Key
              key={key}
              letter={key}
              onClick={onKeyPress}
              isSpecial={key === "ENTER" || key === "BACKSPACE"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
