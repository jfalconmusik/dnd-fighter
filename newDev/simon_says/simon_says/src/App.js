import React, {useState, useEffect, Fragment } from "react"
import {Howl, Howler} from 'howler'; // audio
import { ChromePicker } from 'react-color' // color picker.
import {useSpring, animated, config} from 'react-spring'
import logo from './logo.svg';
import './App.css';


// https://codepen.io/raurir/pen/qtEmn <---- source of pentagram.
// css tricks is where I got the triangles.

// No need for context, cuz so small. No need for router either.

// allow the user to choose from a fun list of background images.
// in order to make sure the images don't just break horrifically, they have to stay constant size.

function App() {


  //
  // how about a game of simon says?


  // here are some fun backgrounds we can add:

  const backgroundArray = [
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/faa48d2d-12c2-43d1-bf23-b5e99857825b/dd0rzgs-2f7a9734-9e7d-4386-86f3-080d67f743e5.png/v1/fill/w_1024,h_576,q_80,strp/the_sacred_tree___daily_deviation_by_ellysiumn_dd0rzgs-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD01NzYiLCJwYXRoIjoiXC9mXC9mYWE0OGQyZC0xMmMyLTQzZDEtYmYyMy1iNWU5OTg1NzgyNWJcL2RkMHJ6Z3MtMmY3YTk3MzQtOWU3ZC00Mzg2LTg2ZjMtMDgwZDY3Zjc0M2U1LnBuZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.L3OaGbTtLfZgyqdudpEIoLqj9amBTCkCUUkstvbSvrc",
    "https://wallpaperaccess.com/full/2195679.jpg",
    "https://www.hdwallback.net/wp-content/uploads/2018/01/Awesome-Night-Time-Wide-Hd-New-Best-Desktop-Background-Full-Free-Hd-Wallpaper-Artworks-Desktop-Images-For-Apple.jpg",
    "https://eskipaper.com/images/best-wallpapers-5.jpg",
    "https://wallpaperboat.com/wp-content/uploads/2019/05/top-best-003.jpg",
    "http://cdn30.us1.fansshare.com/image/hdwallpapersformobile/cool-wallpapers-hd-hd-wallpaper-best-wallpapers-for-desktop-mobile-android-laptop-windows-mac-iphone-nature-cool-1175458238.jpg",
    "https://images7.alphacoders.com/323/thumb-1920-323713.jpg",
    "https://eskipaper.com/images/best-wallpapers-2.jpg",
    "https://weneedfun.com/wp-content/uploads/2016/08/best-wallpapers-hd-14.jpg",
    "https://i.pinimg.com/originals/c9/2a/b9/c92ab9a8993eb33bd46d3fe619af9a25.jpg",
    "https://animal-wallpaper.com/wallpaper/aesthetic-minimalist-wallpapers-1080p-For-Background-HD-Wallpaper.jpg",
    "https://wallpapersite.com/images/wallpapers/stained-glass-2560x1440-spiral-ceiling-hd-5159.jpg"
  ]

  const [backgroundImg, setBackgroundImg] = useState("https://wallpapersite.com/images/wallpapers/stained-glass-2560x1440-spiral-ceiling-hd-5159.jpg")

  useEffect(() => {

    console.log("effect fired")
    console.log(document.getElementById("App-header").style.backgroundImage)
    console.log(backgroundImg)
  }, [backgroundImg])


  function imageCycle(direction) {
    if (direction === "left") {

      console.log("went left")

      if (backgroundArray.indexOf(backgroundImg) >= 0) {
        setBackgroundImg(backgroundArray[backgroundArray.indexOf(backgroundImg) - 1 ])
        console.log("moved back")
      } else {
        console.log("to the end")
        setBackgroundImg(backgroundArray[backgroundArray.length - 1])
      }
    
    } else if (direction === "right") {
console.log("went right")
      if (backgroundArray.indexOf(backgroundImg < 12)) {
        setBackgroundImg(backgroundArray[backgroundArray.indexOf(backgroundImg) + 1 ])
        console.log("moved forward")
      } else {
        setBackgroundImg(backgroundArray[0])
        console.log("to the beginning")
      }
    }
  }


// animation props  ------     From the React Spring documentation:
const spring = useSpring({opacity: 1, from: {opacity: 0}, config: config.wobbly})
// const bounce = useSpring({x: state ? 1 : 0})



// Color picker logic:
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
    <animated.div id="app" className="App" style={spring}>
      <header className="App-header" id="App-header" 
              style={{
                  "backgroundImage": `url(${backgroundImg})`, 
                    "zIndex": "95", 
                      'backgroundRepeat': 'no-repeat',
                      "backgroundSize": "100vw 100vh"}}>
        <div className="shell rotator">
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
        <div className="buttonContainer rotator"> 
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
        <div id="backgrounds">
          <p>{"Pick a pretty background :)"}</p>
                <button onClick={() => imageCycle("left")}>◄</button>
                <button onClick={() => imageCycle("right")}>►</button>
        </div>
      </header>
    </animated.div>
  );
}

export default App;
