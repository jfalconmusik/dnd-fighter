import React, {useState, useEffect, Fragment } from "react"
import {Howl, Howler} from 'howler'; // audio
import { ChromePicker } from 'react-color' // color picker.
import {useSpring, animated, config} from 'react-spring'
import logo from './logo.svg';
import './App.css';


// https://codepen.io/raurir/pen/qtEmn <---- source of pentagram.
// https://css-tricks.com/the-shapes-of-css/ <-------- css tricks is where I got the triangles

// No need for context, cuz so small. No need for router either.

// allow the user to choose from a fun list of background images.
// in order to make sure the images don't just break horrifically, they have to stay constant size.


// game built. instruments pickable. high score. animations. responsive.

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


  
  const soundSets = {
    Rewind: {
      name: "Rewind",
      set: [
            "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/rewind_a.wav?alt=media&token=656cb418-ab87-4b65-a577-afa1c82f99a8",
          "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/rewind_as.wav?alt=media&token=1624f2eb-590d-409c-a195-9d76c4454bbb",
          "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/rewind_d.wav?alt=media&token=d56cf44b-938c-444b-90cf-ffd756d7330b",
          "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/rewind_d5.wav?alt=media&token=0a82fe2e-a385-47b0-bb51-4f92a1f273fd",
          "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/rewind_e.wav?alt=media&token=60dbc985-d6a2-4986-91a0-621b5eca3695"
          ] } ,
    Oni: {
      name: "Oni",
      set:   [
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/on1.wav?alt=media&token=7a831f4e-684f-4839-a362-860d883a11d1",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/on2.wav?alt=media&token=fdafd6e7-2a22-42f3-8df4-e0521c648fcc",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/on3.wav?alt=media&token=12f1d2dc-97c8-42e4-ab03-2e95e7d86d04",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/on4.wav?alt=media&token=4d3bc9b8-6c93-4f95-b0fb-67fb13687e1e",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/on5.wav?alt=media&token=62a1ccf7-cb67-4099-9e06-0b3771a7880e"
    ] } ,
    Kick: {
      name: "Kick",
      set:  [
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/hit_a.wav?alt=media&token=1bb38446-f2c8-44ca-92dc-703e307f5272",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/hit_as.wav?alt=media&token=d97e7df0-cce1-469d-ad0d-c10276576d85",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/hit_c.wav?alt=media&token=eb71f000-54c8-43ec-87dd-0873911c95df",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/hit_e.wav?alt=media&token=2966e3e2-bdb9-4685-b6d3-5f71456eca85",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/hit_g.wav?alt=media&token=64253230-7a53-4c4a-ab7c-986c224806bb"
    ] },
    Celestial: {
      name: "Celestial", 
      set: [
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/gyoza_a.wav?alt=media&token=0366fb38-21f5-435a-a316-cb5ef4a771b2",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/gyoza_as.wav?alt=media&token=42a65832-6215-4655-9300-a86436bf081a",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/gyoza_d.wav?alt=media&token=14e060fe-0a22-4008-a637-6d6d28e1605c",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.c,om/o/gyoza_e.wav?alt=media&token=a2222f70-4301-46f9-bc76-2826c9039008",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/gyoza_g.wav?alt=media&token=45fa468e-cc08-477a-be2f-3876c0fa8f95"
    ]
    }
    ,
    Bendy: [
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_a.wav?alt=media&token=c8705e0e-f85d-4b35-8501-d780951c6bc6",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_as.wav?alt=media&token=242da369-19f9-4541-9766-7ddfe0ddaecc",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_d.wav?alt=media&token=64948261-760b-4d5b-b02f-f50ffdbc38ff",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_e.wav?alt=media&token=d4d0ebfa-4d67-462b-9a16-08d173ec75cd",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_g.wav?alt=media&token=8178ac1f-d3b8-4f25-a980-c8a4a6bc9643"

    ],
    Bass: [
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_as.wav?alt=media&token=673a3cc5-bd77-45a0-9fe4-465a454ac34c",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_d.wav?alt=media&token=e4dc1629-54bd-46c3-a56e-6a30191df24f",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_d3.wav?alt=media&token=3209289a-36bc-4a0a-b7c0-b7853a507331",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_e.wav?alt=media&token=73c87579-ac98-45d5-af3a-d8d56dd65fb7",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_fs.wav?alt=media&token=cec6e1d2-8877-4d96-a5c1-f8c4e1940af9",
    ]
  }
  // one sample on cloud is not used here ^
const instrumentCycle = (direction) => {

  }

  const [currentInstrument, setCurrentInstrument] = useState(soundSets.Celestial)

  
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

// button pressed state...
const [downPressed, setDownPressed] = useState(false);
const [downRightPressed, setDownRightPressed] = useState(false);
const [downLeftPressed, setDownLeftPressed] = useState(false);
const [upRightPressed, setUpRightPressed] = useState(false);
const [upLeftPressed, setUpLeftPressed] = useState(false);





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

  const startGame = () => {
    
  }
  
  const playButton = "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/power-button.svg?alt=media&token=b6863fa6-ad6a-4b14-aaad-fd2d24b9cf73"

  // Make sure to add some clever css effects for the button lights...

  const generateNewSequence = () => {};
  //


  function handleColorPickDisplay() {
    setColorPickDisplayed(!colorPickDisplayed)
  }


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
            <a.button 
              className='arrow'
              type="button" 
              id="downright-arrow"
                onMouseDown={() => setDownRightPressed(true)}
                onMouseUp={() => setDownRightPressed(false)}
              onClick={(e) =>  
                handleClick("downright", e.target)}></a.button>
            <a.button 
              className="arrow"
              type="button" 
              id="downleft-arrow"
                onMouseDown={() => setDownLeftPressed(true)}
                onMouseUp={() => setDownLeftPressed(false)}
              onClick={(e) => 
                handleClick("downleft", e.target)}></a.button>
            <a.button 
              className="arrow"
              type="button" 
              id="down-arrow"
                onMouseDown={() => setDownPressed(true)}
                onMouseUp={() => setDownPressed(false)}
              onClick={(e) => 
                handleClick("downarrow", e.target)}></a.button>
            <a.button 
              className="arrow"
              type="button" 
              id="topright-arrow"
                onMouseDown={() => setTopRightPressed(true)}
                onMouseUp={() => setTopRightPressed(false)}
              onClick={(e) => 
                handleClick("topright", e.target)}></a.button>
            <a.button 
              className="arrow"
              type="button"
              id="topleft-arrow"
                onMouseDown={() => setTopLeftPressed(true)}
                onMouseUp={() => setTopLeftPressed(false)}
              onClick={(e) => 
                handleClick("topleft", e.target)}></a.button>
        </div>
        <span id="centerConsole">
                <img id="playButton" src={`${playButton}`} onClick={() => startGame()}/>
        </span>
        <div style={{"visibility": `${colorPickDisplayed ? "initial" : "hidden"}`}}>
          <span className="modal">
            {/* <p>Pick your color and then click a button!</p> */}
          </span>
              <ChromePicker 
                id="color-picker"
                className="colorPicker"
                color={`${chosenColor}`} 
                onChangeComplete={(e) => setChosenColor(e.hex)}
                
              
                />
        </div>
              
          <button type="button" id="colors" onClick={() => {handleColorPickDisplay()}}
            >{!colorPickDisplayed ? "Colors" : "Keep Playing"}</button>
        <div id="backgrounds">
          <p>{"Pick a pretty background :)"}</p>
                <button onClick={() => imageCycle("left")}>◄</button>
                <button onClick={() => imageCycle("right")}>►</button>
        </div>
        <span id="instruments">
                    <p type="button">{`Instrument: ${currentInstrument.name}`}</p>
                    <button onClick={() => instrumentCycle("left")}>◄</button>
                    <button onClick={() => instrumentCycle("right")}>►</button>
              </span>
      </header>
    </animated.div>
  );
}

export default App;
