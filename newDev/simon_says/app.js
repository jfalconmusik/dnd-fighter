// import { React, useState, useEffect, Fragment } from "react"
//
//
// May I use react?

// ==================
// <Metals Simon Says>
// ===================
//

function simonSays() {
  //
  // how about a game of simon says, but using electric guitar notes in metal scales that we all know and love?
  //===========
  // COLORS : an array of all possible colors that the buttons will have.
  //===========
  //
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "turquoise",
  ];
  // how many buttons does the user want? We will propagate from the colors array.
  const [buttonColors, setButtonColors] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  // ==============
  // NOTES: what are the urls for all these electric guitar notes?
  // =============
  const notes = { e: "url", a: "url", d: "url", g: "etc..." };

  // the user will be able to pick their metal scale, lets create a structure for those.
  const scales = {
    pentatonicb5: [notes.e, notes.a],
    aeolian: [notes.a, notes.g],
    harmonicMinor: [notes.c, notes.f],
  };

  const [currentScale, setCurrentScale] = useState(scales.aeolian);
  // we need to remember the name of the scale we're using.
  //
  // And we need to remember what sequence of notes the user must copy. We're going to spread these notes into an array so we can keep pushing new notes.
  const [currentNotes, setCurrentNotes] = useState([...scales.aeolian]);
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

  const handleClick = (buttonColor) => {
    if (buttonColor == nextButton)
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

  return (
    <div>
      <div id="simonSays" class="center">
        <div id="outerCircle">
          {buttonColors.map((colorIndex) => (
            <div
              style={{ "background-color": `${colors[colorIndex]}` }}
              onClick={() => handleClick(colors[colorIndex])}
            ></div>
          ))}
          <div></div>
        </div>
      </div>
      <div id="rulesLeaderboard" class="left"></div>
      <div id="options" class="right">
        <label for="scales">Choose your scale.</label>
        <input type="select" value="" onChange={() => {}}>
          {scales.map((scale) => (
            <>
              <option id={scale}>{scale}</option>
            </>
          ))}
        </input>

        <button onClick={() => setScale()}>Rock On</button>
      </div>
    </div>
  );
}
