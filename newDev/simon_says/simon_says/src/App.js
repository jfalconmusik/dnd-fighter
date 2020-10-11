import React, {useState, useEffect, Fragment } from "react"
import {Howl, Howler} from 'howler'; // audio
import { ChromePicker } from 'react-color' // color picker.
import logo from './logo.svg';
import './App.css';


// https://codepen.io/raurir/pen/qtEmn <---- source of pentagram.

// No need for context, cuz so small. No need for router either.

// allow the user to choose from a fun list of background images.

function App() {

  //
  // how about a game of simon says?




const [colorPickDisplayed, setColorPickDisplayed] = useState(false)
const [chosenColor, setChosenColor] = useState("#fffff")

useEffect(() => {
  console.log(chosenColor);
}, [chosenColor])

useEffect(() => {
  console.log(colorPickDisplayed);
}, [colorPickDisplayed])


function handleColor(target) {
  if (colorPickDisplayed) {
    if (target.className == "arrow") {

      target.style.borderBottom = `100px solid ${chosenColor}`
      console.log(target)
    }
  }
}







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

  const handleClick = (buttonId, target) => {


    handleColor(target)

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


  function handleColorPickDisplay() {
    setColorPickDisplayed(!colorPickDisplayed)
  }
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
          <div className="circle" onClick={(e) => {handleColor(e.target)}}></div>
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
              className='arrow'
              type="button" 
              id="downright-arrow"
              onClick={(e) =>  
                handleClick("downright", e.target)}></button>
            <button 
              className="arrow"
              type="button" 
              id="downleft-arrow"
              onClick={(e) => 
                handleClick("downleft", e.target)}></button>
            <button 
              className="arrow"
              type="button" 
              id="down-arrow"
              onClick={(e) => 
                handleClick("down-arrow", e.target)}></button>
            <button 
              className="arrow"
              type="button" 
              id="topright-arrow"
              onClick={(e) => 
                handleClick("topright", e.target)}></button>
            <button 
              className="arrow"
              type="button"
              id="topleft-arrow"
              onClick={(e) => 
                handleClick("topleft", e.target)}></button>
        </div>
        <div style={{"visibility": `${colorPickDisplayed ? "initial" : "hidden"}`}}>
          <div className="modal">
            <p>Pick your color and then click a button!</p>
          </div>
              <ChromePicker 
                id="color-picker"
                className="colorPicker"
                color={`${chosenColor}`} 
                onChangeComplete={(e) => setChosenColor(e.hex)}
                
              
                />
        </div>
      
          <button type="button" id="options"></button>
          <button type="button" id="colors" onClick={() => {handleColorPickDisplay()}}
            >{!colorPickDisplayed ? "Colors" : "Keep Playing"}</button>
      </header>
    </div>
  );
}

export default App;
