import React, {useState, useEffect, Fragment } from "react"
import {Howl, Howler} from 'howler'; // audio
import { ChromePicker } from 'react-color' // color picker.
import logo from './logo.svg';
import './App.css';


// https://codepen.io/raurir/pen/qtEmn <---- source of pentagram.

// No need for context, cuz so small. No need for router either.




function App() {

  //
  // how about a game of simon says?




const [colorPickDisplayed, setColorPickDisplayed] = useState(false)
const [chosenColor, setChosenColor] = useState("#fff")


  const [downColor, setDownColor] = useState("maroon");
  const [downrightColor, setDownrightColor] = useState("maroon");
  const [downleftColor, setDownleftColor] = useState("maroon");
  const [toprightColor, setToprightColor] = useState("maroon");
  const [topleftColor, setTopleftColor] = useState("maroon");




useEffect(() => {

  if (colorPickDisplayed) {

  }

}, [colorPickDisplayed])







  // ==============
  // NOTES: what are the urls for all these electric guitar notes?
  // =============
  const notes = { e: "url", a: "url", d: "url", g: "etc..." };

  //
  // And we need to remember what sequence of notes the user must copy. We're going to spread these notes into an array so we can keep pushing new notes.
  const [currentNotes, setCurrentNotes] = useState([]);
  //
  // Where are we in Simon's melody?
  const [sequence, setSequence] = useState([]);
  const [sequenceCurrentPlace, setSequenceCurrentPlace] = useState(0);
  const [nextButton, setNextButton] = useState("red");
  //
  // every time we advance within the current sequence, a new correct choice has to be set.
  useEffect(() => {
    setNextButton(currentNotes[sequenceCurrentPlace]);
  }, [sequenceCurrentPlace]);

  // Choice logic, did the user pick the right note?

  const handleClick = (buttonId) => {
    if (buttonId == nextButton)
      if (sequenceCurrentPlace < sequence.length) {
        setSequenceCurrentPlace(sequenceCurrentPlace + 1);
      } else {
        setSequence([
          ...sequence,
          Math.floor(Math.random * currentNotes.length),
        ]);
        setSequenceCurrentPlace(0);
      }
  };

  // Make sure to add some clever css effects for the button lights...

  const generateNewSequence = () => {};
  //

  // return (
  //   <div>
  //     <div id="simonSays" class="center">
  //       <div id="outerCircle">
  //         {buttonColors.map((colorIndex) => (
  //           <div
  //             style={{ "background-color": `${colors[colorIndex]}` }}
  //             onClick={() => handleClick(colors[colorIndex])}
  //           ></div>
  //         ))}
  //         <div></div>
  //       </div>
  //     </div>
  //     <div id="rulesLeaderboard" class="left"></div>
  //     <div id="options" class="right">
  //       <label for="scales">Choose your scale.</label>
  //       <input type="select" value="" onChange={() => {}}>
  //         {scales.map((scale) => (
  //           <>
  //             <option id={scale}>{scale}</option>
  //           </>
  //         ))}
  //       </input>

  //       <button onClick={() => setScale()}>Rock On</button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="App">
      <header className="App-header">
        <div className="shell">
        <div className="base">
          <div className="circle"></div>
            <div className="bar n0"><li></li></div>
            <div className="bar n1"><li></li></div>
            <div className="bar n2"><li></li></div>
            <div className="bar n3"><li></li></div>
            <div className="bar n4"><li></li></div>
            <div className="overbar n0"><li></li></div>
            <div className="overbar n1"><li></li></div>
            <div className="overbar n2"><li></li></div>
            <div className="overbar n3"><li></li></div>
            <div className="overbar n4"><li></li></div>
          </div>
        </div>
        <div className="buttonContainer">
          <button 
            type="button" 
            id="downright-arrow"
            onClick={() => handleClick("downright")}
            style={{"background-color": downrightColor}}></button>
          <button 
            type="button" 
            id="downleft-arrow"
            onClick={() => handleClick("downleft")}
            style={{"background-color": downleftColor }}></button>
          <button 
            type="button" 
            id="down-arrow"
            onClick={() => handleClick("down")}
            style={{"background-color": downColor }}></button>
          <button 
            type="button" 
            id="topright-arrow"
            onClick={() => handleClick("topright")}
            style={{"background-color": toprightColor }}></button>
          <button 
            type="button"
            id="topleft-arrow"
            onClick={() => handleClick("topleft")}
            style={{"background-color": topleftColor }}></button>
        </div>
        <div>
          <div class="modal">
            <p>Pick your color and then click a button!</p>
          </div>
              <ChromePicker 
                id="color-picker"
                color={`${chosenColor}`} 
                onChangeComplete={() => setChosenColor(color)}
                style={{"display": `${colorPickDisplayed ? "initial" : "none"}`}}
              
                />
        </div>
          <button type="button" id="options"></button>
          <button type="button" id="colors" onClick={() => {setColorPickDisplayed(!colorPickDisplayed)}}
            >{!colorPickDisplayed ? "Colors" : "Keep Playing"}</button>
      </header>
    </div>
  );
}

export default App;
