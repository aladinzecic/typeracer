import "./App.css";
import { React, useState, useEffect, useRef, useContext } from "react";
import json from "./Json/Json.json";
import Timer from "./Timer/Timer";
import Start from "./Start/Start";
import { AppContext } from "./Context/AppContext";
function App() {
  const { isGameOn, setIsGameOn } = useContext(AppContext);
  const [text, setText] = useState("");
  const [sentence, setSentence] = useState("");
  const [counter, setCounter] = useState(1);
  const [red, setRed] = useState(false);
  const [lastGood, setLastGood] = useState(-1);
  const [showDelayedContent, setShowDelayedContent] = useState(false);

  useEffect(() => {
    if (isGameOn) {
      const timeoutId = setTimeout(() => {
        setShowDelayedContent(true);
      }, 3000);
      const endId = setTimeout(() => {
        setIsGameOn(false);
      }, 123000);
      return () => clearTimeout(endId);
    }
  }, [isGameOn]);
  function random() {
    const broj = Math.floor(Math.random() * 29) + 1;
    console.log(broj);
    return broj;
  }
  useEffect(() => {
    setSentence(json[random()].text);
  }, []);

  const containerRef = useRef(null);
  function generate() {
    const letters = sentence.split("");
    const spans = letters.map((slovo, index) => (
      <span className="black" key={index}>
        {slovo}
      </span>
    ));
    return spans;
  }
  const inputRef = useRef(null);

  return (
    <div className="App">
      {showDelayedContent ? (
        <>
          <header ref={containerRef}>{generate()}</header>
          <input
            disabled={!isGameOn}
            type="text"
            ref={inputRef}
            className="input"
            onChange={(e) => {
              e.preventDefault();
              console.log(text);
              const newText = e.target.value;
              const containerElement = containerRef.current;
              const spanToChange = containerElement.querySelector(
                `span:nth-child(${counter})`
              );
              let last = e.target.value.charAt(e.target.value.length - 1);
              if (newText.length < text.length) {
                setCounter(counter - 1);
                setText(text.slice(0, text.length - 1));

                const spanToChangee = containerElement.querySelector(
                  `span:nth-child(${counter - 1})` //jer ti indexiranje kod spanova krece od 1 a text od 0
                );
                spanToChangee.className = "black";
              } else {
                setText(e.target.value);
                console.log(lastGood);
                console.log(text.length);
                if (
                  lastGood == text.length - 1 &&
                  sentence[counter - 1] == last &&
                  red
                ) {
                  setRed(false);
                  spanToChange.className = "green";
                  setCounter(counter + 1);
                } else if (sentence[counter - 1] == last) {
                  if (red) {
                    spanToChange.className = "red";
                  } else {
                    spanToChange.className = "green";
                    setLastGood(counter - 1);
                  }
                  setCounter(counter + 1);
                } else {
                  spanToChange.className = "red";
                  setRed(true);
                  setCounter(counter + 1);
                }
              }
            }}
          ></input>
          <Timer time={120} />
        </>
      ) : (
        <>
          <Start />
        </>
      )}
    </div>
  );
}

export default App;
