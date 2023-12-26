import "./App.css";
import { React, useState, useEffect, useRef, useContext } from "react";
import json from "./Json/Json.json";
import Timer from "./Timer/Timer";
import Start from "./Start/Start";
import { AppContext } from "./Context/AppContext";
import Navbar from "./Navbar/Navbar";
import Button from "./Button/Button";
function App() {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const {
    isGameOn,
    setIsGameOn,
    gameTime,
    setLoadTimerOn,
    startTime,
    secondsRemaining,
  } = useContext(AppContext);
  const [text, setText] = useState("");
  const [sentence, setSentence] = useState("");
  const [counter, setCounter] = useState(1);
  const [red, setRed] = useState(false);
  const [lastGood, setLastGood] = useState(-1);
  const [filterStyle, setFilterStyle] = useState("blur(5px)");
  const [wpm, setWpm] = useState(0);
  const [refreshWpm, setRefreshWpm] = useState(false);

  useEffect(() => {
    if (isGameOn) {

      setLoadTimerOn(false);
      setFilterStyle("none");
      inputRef.current.focus();
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });

      const endId = setTimeout(() => {
        setIsGameOn(false);
      }, gameTime * 1000);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the input
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        inputRef.current.focus();
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (refreshWpm)
      setWpm(
        Math.floor(lastGood / ((5 * (startTime - secondsRemaining)) / 60))
      );
    console.log(lastGood);
    console.log(startTime);
    console.log(gameTime);
  }, [refreshWpm]);

  useEffect(() => {
    if (counter % 5 === 0) setRefreshWpm(true);
    else setRefreshWpm(false);
  }, [counter]);
  function generate() {
    const letters = sentence.split("");
    const spans = letters.map((slovo, index) => (
      <span className="black" key={index}>
        {slovo}
      </span>
    ));
    return spans;
  }

  return (
    <div className="App">
      <Navbar />
      <header ref={containerRef} style={{ filter: filterStyle }}>
        {generate()}
      </header>
      <div className="wpm-timer">
        {isGameOn ? (
          <div className="wpm-div">
            <h1>{wpm} wpm</h1>
          </div>
        ) : (
          <></>
        )}
        {isGameOn ? <Timer time={gameTime} /> : <Start />}
      </div>
      <input
        autoFocus
        disabled={!isGameOn}
        type="text"
        ref={inputRef}
        className="input"
        onChange={(e) => {
          e.preventDefault();
          console.log(counter);
          console.log(lastGood);
          const newText = e.target.value;
          const containerElement = containerRef.current;
          const spanToChange = containerElement.querySelector(
            `span:nth-child(${counter})`
          );
          let last = e.target.value.charAt(e.target.value.length - 1);
          if (newText.length < text.length) {
            const spanToChangee = containerElement.querySelector(
              `span:nth-child(${counter - 1})` //jer ti indexiranje kod spanova krece od 1 a text od 0
            );
            if (sentence[counter - 2] == " " && !red) {
              console.log("object");
            } else if (sentence[counter - 2] == " " && red) {
              spanToChangee.style.border = "0px white";
              console.log("respect");
              setCounter(counter - 1);
            } else {
              setCounter(counter - 1);
            }
            setText(text.slice(0, text.length - 1));

            spanToChangee.className = "black";
          } else {
            setText(e.target.value);
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
              if (sentence[counter - 1] == " ") {
                spanToChange.style.border = "1px solid red";
              }
              spanToChange.className = "red";
              setRed(true);
              setCounter(counter + 1);
            }
          }
        }}
      ></input>
      <div className="buttons">
        <Button time={30} />
        <Button time={60} />
        <Button time={120} />
      </div>
    </div>
  );
}

export default App;
