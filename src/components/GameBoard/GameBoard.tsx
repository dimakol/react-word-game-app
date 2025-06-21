import { useState, useCallback, useEffect, useMemo } from "react";
// Import services
import MyActionListener from "../../services/ActionListener/ActionListener";
// Import components
import { Keyboard } from "../Keyboard";
import { Square } from "../Square";
// Import hooks
import { useDictionaryQuery } from "../../hooks/useDictionaryQuery";
// Import styles
import GameBoardStyles from "./GameBoard.module.css";

const Status = {
  Empty: "empty",
  Correct: "correct",
  Incorrect: "incorrect",
} as const;

const ACTION_TYPES = {
  LETTER_INPUT: "LETTER_INPUT",
  BACKSPACE: "BACKSPACE",
  ENTER: "ENTER",
};

const actionListener = new MyActionListener();

// Main Game Component
const GameBoard = () => {
  const [letters, setLetters] = useState(["", "", "", "", ""]);
  // Game status - Status can be "empty", "correct", or "incorrect"
  const [status, setStatus] = useState<(typeof Status)[keyof typeof Status]>(
    Status.Empty
  );
  const currentWord = useMemo(() => letters.join(""), [letters]);
  // Fetch dictionary data based on the current word using a custom hook
  const { data, isError, refetch } = useDictionaryQuery(currentWord);

  // Handle letter input
  const handleLetterInput = useCallback((letter: string | null) => {
    if (letter !== null) {
      setLetters((prev) => {
        const emptyIndex = prev.findIndex((l) => l === "");
        if (emptyIndex !== -1) {
          const newLetters = [...prev];
          newLetters[emptyIndex] = letter;
          return newLetters;
        }
        return prev;
      });
      setStatus(Status.Empty);
    }
  }, []);

  // Handle backspace
  const handleBackspace = useCallback(() => {
    // Find the last filled index and clear it
    // If no letters are filled, return the previous state
    setLetters((prev) => {
      const lastFilledIndex = prev.map((l) => l !== "").lastIndexOf(true); // prev.map((l) => l !== "") converts the letters array into an array of boolean values.
      if (lastFilledIndex !== -1) {
        const newLetters = [...prev];
        newLetters[lastFilledIndex] = "";
        return newLetters;
      }
      return prev;
    });
    setStatus(Status.Empty);
  }, []);

  // Handle enter (word validation)
  const handleEnter = useCallback(() => {
    if (currentWord.length === 5) {
      refetch();
    } else {
      setStatus(Status.Incorrect);
    }
  }, [currentWord, refetch]);

  // Set up action listeners
  useEffect(() => {
    actionListener.registerListener(
      ACTION_TYPES.LETTER_INPUT,
      handleLetterInput
    );
    actionListener.registerListener(ACTION_TYPES.BACKSPACE, handleBackspace);
    actionListener.registerListener(ACTION_TYPES.ENTER, handleEnter);

    return () => {
      actionListener.removeListener(ACTION_TYPES.LETTER_INPUT);
      actionListener.removeListener(ACTION_TYPES.BACKSPACE);
      actionListener.removeListener(ACTION_TYPES.ENTER);
    };
  }, [handleLetterInput, handleBackspace, handleEnter]);

  // Handle key press from keyboard
  const handleKeyPress = (key: string) => {
    if (key === "ENTER") {
      actionListener.emit(ACTION_TYPES.ENTER, null);
    } else if (key === "BACKSPACE") {
      actionListener.emit(ACTION_TYPES.BACKSPACE, null);
    } else if (/^[A-Z]$/.test(key)) {
      actionListener.emit(ACTION_TYPES.LETTER_INPUT, key);
    }
  };

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (key === "ENTER") {
        event.preventDefault();
        handleKeyPress("ENTER");
      } else if (key === "BACKSPACE") {
        event.preventDefault();
        handleKeyPress("BACKSPACE");
      } else if (/^[A-Z]$/.test(key)) {
        event.preventDefault();
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (data) {
      setStatus(Status.Correct);
    } else if (isError) {
      setStatus(Status.Incorrect);
    }
  }, [data, isError]);

  const getStatusMessageClass = () => {
    let className = GameBoardStyles.statusMessage;
    if (status === Status.Correct) className += " correct";
    if (status === Status.Incorrect) className += " incorrect";
    return className;
  };

  return (
    <>
      <div className={GameBoardStyles.gameWrapper}>
        <h1 className={GameBoardStyles.gameTitle}>Word Game</h1>

        {/* Letter Squares */}
        <div className={GameBoardStyles.squareContainer}>
          {letters.map((letter, index) => (
            <Square key={index} letter={letter} status={status} />
          ))}
        </div>

        {/* Status Message */}
        <div className={getStatusMessageClass()}>
          {status === Status.Correct && <span>🎉 Great! Valid word!</span>}
          {status === Status.Incorrect && <span>❌ Not a valid word</span>}
        </div>

        {/* Instructions */}
        <div className={GameBoardStyles.instructions}>
          <p>Click letters to fill squares</p>
          <p>Press Enter when all squares are filled to check word</p>
          <p>Use Backspace to remove letters</p>
        </div>
      </div>

      {/* Keyboard */}
      <Keyboard onKeyPress={handleKeyPress} />
    </>
  );
};

export default GameBoard;
