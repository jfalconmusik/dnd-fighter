import React, {useState, useEffect, Fragment } from "react"
import {Howl, Howler} from 'howler'; // audio
import { ChromePicker } from 'react-color' // color picker.
import {useSpring, animated, config, interpolate} from 'react-spring'
// import useSound from 'use-sound'
import ReactAudioPlayer from 'react-audio-player';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase"


// https://codepen.io/raurir/pen/qtEmn <---- source of pentagram.
// https://css-tricks.com/the-shapes-of-css/ <-------- css tricks is where I got the triangles


// some inspiration fror the clicky button came from: https://stackoverflow.com/questions/55130413/animated-button-with-react-spring



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
  
  const [backgroundImg, setBackgroundImg] = useState("https://eskipaper.com/images/best-wallpapers-2.jpg")
  
  
  const soundSets = {
    Rewind: {
      name: "Rewind",
      set: [
        "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/rewind_a.wav?alt=media&token=63e4402f-a82d-4adf-a2bd-2d2b61a36673",
        "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/rewind_as.wav?alt=media&token=bbece949-f581-421d-9bff-dbcfd3e75533",
        "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/rewind_d.wav?alt=media&token=289c7b97-398b-489d-ae26-0d5f530c6aa6",
        "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/rewind_d5.wav?alt=media&token=23891bda-f996-403e-99ca-bc4540cd07b7",
        "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/rewind_e.wav?alt=media&token=5814671e-9bd7-4fc3-a4d6-54878a7dcb21"
        ] } , 
    Oni: {
      name: "Oni",
      set:   [
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/on1.wav?alt=media&token=2fcbbc02-fd3d-4070-a722-91e69e18f5fe",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/onRedo.wav?alt=media&token=87e0a0f2-f5b3-4b19-9891-bc6a704cedcc",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/on3.wav?alt=media&token=8f5a3150-7e79-4625-999f-95288df6f16c",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/on4.wav?alt=media&token=780eb3ee-42c3-44a3-ab67-ca2a507a9575",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/on5.wav?alt=media&token=4405bf15-9613-4407-9e12-df40a4041e8d"
    ] } ,
    Kick: {
      name: "Kick",
      set:  [
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/hit_a.wav?alt=media&token=51202a93-d013-4ada-b70e-a3b16988946e",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/hit_as.wav?alt=media&token=88ffbf8f-6cda-463b-bc21-0988599b06d8",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/hit_c.wav?alt=media&token=c950a69a-5d9d-4ccd-b494-d6cb78f2d4dc",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/hit_e.wav?alt=media&token=2213a65c-48ea-4846-a3b5-1a3cf3a28b84",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/hit_g.wav?alt=media&token=6c117824-562d-4c33-95f0-3262d92f360b"
    ] },
    Celestial: {
      name: "Celestial", 
      set: [
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/gyoza_a.wav?alt=media&token=6407d6e1-9afa-43df-8e96-9f88fac3b988",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/gyoza_as.wav?alt=media&token=d7020c7a-508f-4254-8c69-a2e7c1bcf407",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/gyoza_d.wav?alt=media&token=aaef5e22-3668-44fc-833f-6b15c02fdb76",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/gyoza_e.wav?alt=media&token=3bd0e6a1-5061-4084-8bea-2b5c4f277ca4",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/gyoza_g.wav?alt=media&token=3b107b27-9a03-4cc6-88ec-ee54eb2a7428"
    ]}
    ,
    Bendy:  {
      name: "Bendy",
      set:  [
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/bend_a.wav?alt=media&token=980747bf-be3c-4ca5-97d0-724561e61bc2",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/bend_as.wav?alt=media&token=a01738fe-648f-4285-9be5-d6eb20ab3b7d",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/bend_d.wav?alt=media&token=19f78f3a-a252-48ab-91bc-e9e96be4e812",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/bend_e.wav?alt=media&token=f56900d5-31db-451d-afbe-fa88e8cbf14d",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/bend_g.wav?alt=media&token=83dfcf5e-4a21-4c5f-826e-195f45de1c05"
    ]
    } ,
    Bass: {
      name: "Bass",
      set:  [
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/808_as.wav?alt=media&token=e02621f8-4876-4d9b-ba4a-96c7fc2780d2",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/808_d.wav?alt=media&token=65ff35d3-859a-443c-a435-e6230bb3ef32",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/808_d3.wav?alt=media&token=2bc78b3f-003b-475d-a716-723837691488",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/808_e.wav?alt=media&token=8150925b-14f3-4ef0-b465-6b7022108d38",
      "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/808_fs.wav?alt=media&token=78d01dae-a242-4dcf-8bb5-d9af6947d1e1",
    ]
    }

  }
  // one sample on cloud is not used here ^
  const playButton = "https://firebasestorage.googleapis.com/v0/b/jfalconmusik.appspot.com/o/power-button.svg?alt=media&token=b6863fa6-ad6a-4b14-aaad-fd2d24b9cf73"


// the triangles:
const triRed = "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/tri%20red.png?alt=media&token=5b2729ee-a02d-4b45-b5f5-da6ea5d36c0e"
const triYellow = "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/tri%20yellow.png?alt=media&token=58bdf036-5397-41cc-aefa-2fd7a92b4733"
const triWhite = "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/tri%20white.png?alt=media&token=c870143b-8c53-4ead-bb85-c14a6dccc47a"
const triPurple = "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/tri%20purple%202.png?alt=media&token=66319351-d5ff-4e0b-97e1-ed73258ce490"
const triBlue = "https://firebasestorage.googleapis.com/v0/b/musicgame-9c202.appspot.com/o/tri%20blue.png?alt=media&token=add398a5-49af-42d2-a73e-92f345eb3391"



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


  useEffect(() => {
    // this just tells me if the background changes
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
  const [gameStarted, setGameStarted] = useState(false)

  //
  const [computersTurn, setComputersTurn] = useState(false)
  const [playersTurn, setPlayersTurn] = useState(false)
  const [playerClickCount, setPlayerClickCount] = useState(0)
  //
  const [highScore, setHighScore] = useState(0)
  //
  // every time we advance within the current sequence, a new correct choice has to be set.
  useEffect(() => {
    setNextButton(currentNotes[sequenceCurrentPlace]);
  }, [sequenceCurrentPlace]);

  const optionsArray = ['topleft', 'topright', 'downleft', 'downright', 'down']

  let newArr = []
      

  const startGame = () => {
    console.log(`game started = ${gameStarted}`)
    newArr = []
    if (!gameStarted) {
      setGameStarted(true)
      
      for (let i = 0; i < 4; i++) {

        // we have to concat i onto the end so that the exact option can be looked up in the sequence
        newArr.push(`${optionsArray[Math.floor(Math.random() * optionsArray.length)]}-${i}`)
      }
      setSequence([...newArr])
      console.log(newArr)
      playSequence(newArr)

    } else {
      setGameStarted(false)
      loseGame(); 
    }
    // console.log(playSound)
    // playSound.play()
  }


  const playSequence = (sequence, newStepArg) => {
  console.log(`playing sequence. gamestarted is ${gameStarted}`)

    if ((sequence.length > 0)) {
      // this really should only run if the game HAS started, but this is how it is for now, for debugging.

    setComputersTurn(true)
    setPlayersTurn(false)

      let newSeq = [...sequence]

      if (newStepArg) {
        newSeq.push(newStepArg)
      }


    setTimeout(() => {

      newSeq.forEach(i =>  {

        let itemArr = i.split("-")

        let item = itemArr[0]
        let itemIndex = itemArr[1]

          console.log(`sequence: ${item} ${itemIndex}`)

          if (item == "down") {

            setTimeout(() => {
              setDownPressed(true)
              handleClick(item, "computer")
            }, Number((itemIndex + 1) * 200))
              /////
                  setTimeout(() => {
                    setDownPressed(false)

                  }, Number((itemIndex + 1) * 300))
                } else if (item == "downleft") {


            setTimeout(() => {
              setDownLeftPressed(true)
              handleClick(item, "computer")
            }, Number((itemIndex + 1) * 200))
            /////
                  setTimeout(() => {
                    setDownLeftPressed(false)

                  }, Number((itemIndex + 1) * 300))
                } else if (item == "downright") {
                

            setTimeout(() => {
              setDownRightPressed(true)
              handleClick(item, "computer")
            }, Number((itemIndex + 1) * 200))
            /////
                  setTimeout(() => {
                    setDownRightPressed(false)

                  }, Number((itemIndex + 1) * 300))
                } else if (item == "topleft") {
              
            setTimeout(() => {
              setTopLeftPressed(true)
              handleClick(item, "computer")
            }, Number((itemIndex + 1) * 200))
            /////
                  setTimeout(() => {
                    setTopLeftPressed(false)

                  }, Number((itemIndex + 1) * 300))
                } else if (item == "topright") {

            setTimeout(() => {
              
              setTopRightPressed(true)
              handleClick(item, "computer")
            }, Number((itemIndex + 1) * 200))
            ////
                  setTimeout(() => {
                    setTopRightPressed(false)

                  }, Number((itemIndex + 1) * 300))
                }
      })

    }, 1000)

    setComputersTurn(false)
    setPlayersTurn(true)
    }

  }



  const loseGame = () => {
    console.log("game lost")

    document.getElementById('playButton').style.backgroundColor = "red"

    setTimeout(() => {

      document.getElementById('playButton').style.backgroundColor = "white"

    }, 1000)

    // animation, then:
    setPlayerClickCount(0)
    setSequence([])
    setPlayersTurn(false)
    setComputersTurn(false)
    setGameStarted(false)
  }

  const completeRound = () => {
    console.log("round completed")
    // animation, then:
    if (sequence.length > highScore) {
      setHighScore(sequence.length)
    }

    document.getElementById('playButton').style.backgroundColor = "gold"

    setTimeout(() => {
      document.getElementById('playButton').style.backgroundColor = "white"
    }, 1000)



    let newStep = `${optionsArray[Math.floor(Math.random() * optionsArray.length)]}-${sequence.length}`
    console.log(optionsArray)
    console.log(optionsArray[Math.floor(Math.random * sequence.length)])
    console.log(`this is new step:${newStep}`)
    let thisSequence = [...sequence, newStep]

    setPlayerClickCount(0)
    setSequence([...sequence, newStep])
    playSequence(sequence, newStep)
  }





  const handleClick = (buttonId, user, target) => {

    if (user !== "player") {
      setPlayerClickCount(0)

    }

    if (user === "player" && playersTurn) {
      let thisTurn = playerClickCount
      let roundArr = sequence[thisTurn].split("-")
      let currentItem = roundArr[0]

      
      if (currentItem !== buttonId) {
        loseGame() // still have to write lose game logic.
      } else if (currentItem === buttonId && (playerClickCount + 1) == sequence.length) {
        completeRound()
      }
      
      setPlayerClickCount(playerClickCount + 1)
    }



    if (buttonId == "topright") {
        let newSound = new Howl({
          // src: `${topRightSound}`
          src: `${topRightSound}`,
          buffer: true,
          html5: true
        })

        console.log(newSound)
        console.log(`topright played: ${newSound.src}`)
        newSound.play()
        // useSound(topRightSound)

    } else if (buttonId == "topleft") {
        let newSound = new Howl({
          src: `${topLeftSound}`,
          buffer: true,
          html5: true
        })

        console.log(newSound)
        console.log(`topleft played: ${newSound.src}`)
        newSound.play()
        // useSound(topLeftSound)

    } else if (buttonId == "downright") {
        let newSound = new Howl({
          src: `${downRightSound}`,
          buffer: true,
          html5: true
        })

        console.log(newSound)
        console.log(`downright played: ${newSound.src}`)
        newSound.play()
        // useSound(downRightSound)

    } else if (buttonId == "downleft") {
        let newSound = new Howl({
          src: `${downLeftSound}`,
          buffer: true,
          html5: true
        })

        console.log(newSound)
        console.log(`downleft played: ${newSound.src}`)
        newSound.play()
        // useSound(downLeftSound)

    } else if (buttonId == "down") {
        let newSound = new Howl({
          src: `${downSound}`,
          buffer: true,
          html5: true
        })

        console.log(newSound)
        console.log(`down played: ${newSound.src}`)
        newSound.play()
        // useSound(downSound)

    }


    if (target) {

      handleColor(target)
    }

  };

  

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
                            handleClick("downright", "player", e.target)}></animated.button>
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
                        handleClick("downleft", "player", e.target)}></animated.button>
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
                              handleClick("down", "player", e.target)}></animated.button>
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
                            handleClick("topright", "player", e.target)}></animated.button>
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
                          handleClick("topleft", "player", e.target)}></animated.button>
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
                  id="playButton" src={`${playButton}`} onClick={() => {startGame()}}/>
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
              <span>
        <p style={{"display": `${(highScore > 0) ? "initial" : "none"}`}}>{`High Score: ${highScore}`}</p>
              </span>
      </header>
    </animated.div>
  );
}

export default App;
