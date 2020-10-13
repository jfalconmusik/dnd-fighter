import React, {useState, useEffect, Fragment } from "react"
import {Howl, Howler} from 'howler'; // audio
import { ChromePicker } from 'react-color' // color picker.
import {useSpring, animated, config, interpolate} from 'react-spring'
import logo from './logo.svg';
import './App.css';
import firebase from "firebase"


// https://codepen.io/raurir/pen/qtEmn <---- source of pentagram.
// https://css-tricks.com/the-shapes-of-css/ <-------- css tricks is where I got the triangles


// some inspiration fror the clicky button came from: https://stackoverflow.com/questions/55130413/animated-button-with-react-spring

// No need for context, cuz so small. No need for router either.

// allow the user to choose from a fun list of background images.
// in order to make sure the images don't just break horrifically, they have to stay constant size.


// game built. instruments pickable. high score. animations. responsive.

// temporary modals to show info.

function App() {


  //
  // how about a game of simon says?

/////////////////////////////////////////////////
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
            "/Users/jessefalconmusik/simon_says/public/sounds/rewind_a.wav",
            "../public/sounds/rewind_as.wav",
            "../public/sounds/rewind_d.wav",
            "../public/sounds/rewind_d5.wav",
            "../public/sounds/rewind_e.wav",
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
    Bendy:  {
      name: "Bendy",
      set:  [
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_a.wav?alt=media&token=c8705e0e-f85d-4b35-8501-d780951c6bc6",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_as.wav?alt=media&token=242da369-19f9-4541-9766-7ddfe0ddaecc",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_d.wav?alt=media&token=64948261-760b-4d5b-b02f-f50ffdbc38ff",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_e.wav?alt=media&token=d4d0ebfa-4d67-462b-9a16-08d173ec75cd",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/bend_g.wav?alt=media&token=8178ac1f-d3b8-4f25-a980-c8a4a6bc9643"

    ]
   } ,
    Bass: {
      name: "Bass",
      set:  [
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_as.wav?alt=media&token=673a3cc5-bd77-45a0-9fe4-465a454ac34c",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_d.wav?alt=media&token=e4dc1629-54bd-46c3-a56e-6a30191df24f",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_d3.wav?alt=media&token=3209289a-36bc-4a0a-b7c0-b7853a507331",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_e.wav?alt=media&token=73c87579-ac98-45d5-af3a-d8d56dd65fb7",
      "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/808_fs.wav?alt=media&token=cec6e1d2-8877-4d96-a5c1-f8c4e1940af9",
    ]
    }
   
  }
  // one sample on cloud is not used here ^






  const instrumentCycle = (direction) => {

    const instrumentNamesArray = ["Celestial", "Bendy", "Bass", "Rewind", "Oni", "Kick"]

    if (direction == "right") {

      if (instrumentNamesArray.indexOf(currentInstrument.name) < 5) {
        setCurrentInstrument(soundSets[`${instrumentNamesArray[instrumentNamesArray.indexOf(currentInstrument.name) + 1]}`])
      } else {
        setCurrentInstrument(soundSets.Celestial)
      }
    } else if (direction == "left") {

      if (instrumentNamesArray.indexOf(currentInstrument.name) > 0) {
        setCurrentInstrument(soundSets[`${instrumentNamesArray[instrumentNamesArray.indexOf(currentInstrument.name) - 1]}`])
      } else {
        setCurrentInstrument(soundSets.Kick)
      }
    }



    }



  const [currentInstrument, setCurrentInstrument] = useState(soundSets.Celestial)
  const [topRightSound, setTopRightSound] = useState("")
  const [topLeftSound, setTopLeftSound] = useState("")
  const [downRightSound, setDownRightSound] = useState("")
  const [downLeftSound, setDownLeftSound] = useState("")
  const [downSound, setDownSound] = useState("")
  

  useEffect(() => {

    setTopRightSound(currentInstrument.set[0])
    setTopLeftSound(currentInstrument.set[1])
    setDownLeftSound(currentInstrument.set[2])
    setDownRightSound(currentInstrument.set[3])
    setDownSound(currentInstrument.set[4])

  }, [currentInstrument])





  
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
const [playPressed, setPlayPressed] = useState(false);
const [downPressed, setDownPressed] = useState(false);
const [downRightPressed, setDownRightPressed] = useState(false);
const [downLeftPressed, setDownLeftPressed] = useState(false);
const [topRightPressed, setTopRightPressed] = useState(false);
const [topLeftPressed, setTopLeftPressed] = useState(false);



useEffect(() => {
  if (playPressed) {
    document.getElementById('playButton').style.backgroundColor = "#06d6a0"
  } else {
    document.getElementById('playButton').style.backgroundColor = "white"
  }
}, [playPressed])


// animation props  ------     From the React Spring documentation:
const spring = useSpring({opacity: 1, from: {opacity: 0}, config: config.wobbly})


const springDownRight = useSpring({from: {scale: 1}, to: {scale: downRightPressed? 0.8 : 1, transform: "rotate(110deg)"}})
const springDownLeft = useSpring({from: {scale: 1}, to: {scale: downLeftPressed? 0.8 : 1, transform: "rotate(-110deg)"}})
const springDown = useSpring({from: {scale: 1}, to: {scale: downPressed? 0.8 : 1, transform: "rotate(-180deg)"}})
const springTopRight = useSpring({from: {scale: 1}, to: {scale: topRightPressed? 0.8 : 1, transform: "rotate(35deg)"}})
const springTopLeft = useSpring({from: {scale: 1}, to: {scale: topLeftPressed? 0.8 : 1, transform: "rotate(-35deg)"}})
// const springPlayButton = useSpring({from: {scale: 0.05}, to: {scale: playPressed? 1 : 0.03}})
// const bounce = useSpring({x: state ? 1 : 0})




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






//



  const handleClick = (buttonId, target) => {

    if (buttonId == "topright") {
        let newSound = new Howl({
          // src: `${topRightSound}`
          src: "/Users/jessefalconmusik/simon_says/public/sounds/rewind_a.wav"
        })

        console.log(newSound)
        console.log(`topright played: ${newSound.src}`)
        newSound.play()

    } else if (buttonId == "topleft") {
        let newSound = new Howl({
          src: `${topLeftSound}`
        })

        console.log(newSound)
        console.log(`topleft played: ${newSound.src}`)
        newSound.play()

    } else if (buttonId == "downright") {
        let newSound = new Howl({
          src: `${downRightSound}`
        })

        console.log(newSound)
        console.log(`downright played: ${newSound.src}`)
        newSound.play()

    } else if (buttonId == "downleft") {
        let newSound = new Howl({
          src: `${downLeftSound}`
        })

        console.log(newSound)
        console.log(`downleft played: ${newSound.src}`)
        newSound.play()

    } else if (buttonId == "down") {
        let newSound = new Howl({
          src: `${downSound}`
        })

        console.log(newSound)
        console.log(`down played: ${newSound.src}`)
        newSound.play()

    }









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
        <animated.section props={springDownRight} style={{  
                  display: "relative", 
                  width: "20%",
                  marginTop: "-74%",
                  marginLeft: "-19%",
                  height: "auto",
                  
                transform: springDownRight.scale.interpolate(scale => `scale(${scale})`)}}>
                        <animated.button 
                          className='arrow'
                          type="button" 
                          id="downright-arrow"
                          props={springDownRight}
                          style={{
                            borderColor: "white transparent",
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderWidth: "0px 20px 20px 20px",
                            width: "0",
                            height: "0",
                            borderLeft: "50px solid transparent",
                            borderRight: "50px solid transparent",
                            borderBottom: "100px solid #c04dc6",
                            bottom: "-38%",
                            left: "13%",
                            position: "relative",
                        
                          }}
                            onMouseDown={() => setDownRightPressed(true)}
                            onMouseUp={() => setDownRightPressed(false)}
                          onClick={(e) =>  
                            handleClick("downright", e.target)}></animated.button>
          </animated.section>
                  <animated.section props={springDownLeft} style={{  
                  display: "relative", 
                  width: "20%",
                  marginTop: "-33%",
                  marginLeft: "-85%",
            
                  left: "10%",
                  right: "00%",
                  top: "0%",
                  height: "auto",
                  zIndex: 70,
                  
                transform: springDownLeft.scale.interpolate(scale => `scale(${scale})`)}}>
                    <animated.button 
                      className="arrow"
                      type="button" 
                      id="downleft-arrow"
                      props={springDownLeft}
                      style={{
                        borderColor: "white transparent",
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderWidth: "0px 20px 20px 20px",
                        width: "0",
                        height: "0",
                        borderLeft: "50px solid transparent",
                        borderRight: "50px solid transparent",
                        borderBottom: "100px solid #c04dc6",
                        borderBottom: "100px solid#CFE010",
                        bottom: "-38%",
                        left: "-7.7%",
                        position: "relative",
                      }}
                        onMouseDown={() => setDownLeftPressed(true)}
                        onMouseUp={() => setDownLeftPressed(false)}
                      onClick={(e) => 
                        handleClick("downleft", e.target)}></animated.button>
                </animated.section>
                <animated.section props={springDown} style={{  
                  display: "relative", 
                  width: "20%",
                  marginTop: "-10%",
                  marginLeft: "-50%",
                  height: "auto",
                  
                transform: springDown.scale.interpolate(scale => `scale(${scale})`)}}>
                          <animated.button 
                            className="arrow"
                            type="button" 
                            id="down-arrow"
                            props={springDown}
                            style={{
                              borderColor: "white transparent",
                              backgroundColor: "transparent",
                              borderStyle: "solid",
                              borderWidth: "0px 20px 20px 20px",
                              width: "0",
                              height: "0",
                              borderLeft: "50px solid transparent",
                              borderRight: "50px solid transparent",
                              borderBottom: "100px solid #2b51ca",
                              bottom: "-49.5%",
                              left: "-6%",
                              position: "relative",
                            }}
                              onMouseDown={() => setDownPressed(true)}
                              onMouseUp={() => setDownPressed(false)}
                            onClick={(e) => 
                              handleClick("down", e.target)}></animated.button>
                    </animated.section>
                  <animated.section props={springTopRight} style={{  
                  display: "relative", 
                  width: "20%",
                  marginTop: "-100%",
                  marginLeft: "-30%",
                  height: "auto",
                transform: springTopRight.scale.interpolate(scale => `scale(${scale})`)}}>
                        <animated.button 
                          className="arrow"
                          type="button" 
                          id="topright-arrow"
                          props={springTopRight}
                          style={{
                            borderColor: "white transparent",
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderWidth: "0px 20px 20px 20px",
                            width: "0",
                            height: "0",
                            borderLeft: "50px solid transparent",
                            borderRight: "50px solid transparent",
                            borderBottom: "100px solid #ffffff",
                            bottom: "0%",
                            left: "0%",
                            position: "relative",
                            // transform: springTopRight.scale.interpolate(scale => `scale(${scale})`)
                          }}
                            onMouseDown={() => setTopRightPressed(true)}
                            onMouseUp={() => setTopRightPressed(false)}
                          onClick={(e) => 
                            handleClick("topright", e.target)}></animated.button>
                </animated.section>
                <animated.section props={springTopLeft} style={{  
                  display: "relative", 
                  width: "20%",
                  marginTop: "-30%",
                  marginLeft: "-65%",
                  height: "auto",
                  
                transform: springTopLeft.scale.interpolate(scale => `scale(${scale})`)}}>
                      <animated.button 
                        className="arrow"
                        type="button"
                        id="topleft-arrow"
                        props={springTopLeft}
                        style={{
                          borderColor: "white transparent",
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderWidth: "0px 20px 20px 20px",
                          width: "0",
                          height: "0",
                          borderLeft: "50px solid transparent",
                          borderRight: "50px solid transparent",
                          borderBottom: "100px solid #e01810",
                          bottom: "-0%",
                          left: "-30%",
                          marginBottom: "0%",

                          position: "relative",
                          // transform: springTopLeft.scale.interpolate(scale => `scale(${scale})`)
                        
                        }}
                          onMouseDown={() => setTopLeftPressed(true)}
                          onMouseUp={() => setTopLeftPressed(false)}
                        onClick={(e) => 
                          handleClick("topleft", e.target)}></animated.button>
                          </animated.section>
        </div>
        <animated.section
          style={{
              // transform: springPlayButton.scale.interpolate(scale => `scale(${scale})`)
          }}
                id="centerConsole" 
                onMouseDown={() => setPlayPressed(true)}
                onMouseUp={() => setPlayPressed(false)}>
                <img 
                  id="playButton" src={`${playButton}`} onClick={() => startGame()}/>
        </animated.section>
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
