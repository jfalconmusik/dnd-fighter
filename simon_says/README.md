## Simon Says!

Now who doesn't love the classic game of Simon Says?

This game was built using React, a fantastic frontend library developed by Facebook. You'll love it. Everything just makes sense. All of my state is maintained within "hooks" => these are simply variables of certain types with readily defined methods for updating them as needed.

Simon says is simple. There are five basic buttons, plus the start button. On starting the game, a random sequence of four buttons will be pressed by the computer. The job of the player is to repeat this pattern. If the user is successful, the computer will add another random button to the sequence. The player will continually copy the computer until the player runs out of memory (lol).

The animations for the button presses comes from React Spring, a beautiful styling library. The sounds are played using Howler.js. Both of these were downloaded using Node Package Manager.

There are some tertiary features, such as the ability to select a background, or to select the type of sounds you want to hear when you press the buttons.

######

Much of the bulk of the JS is a stream of conditionals describing activities for each individual button. The function which tells the program to play the sequence also takes in an optional argument which corresponds to whichever new button might be pushed into the sequence. An interesting tidbit is that the program has to match the button you've pressed with the item of the array corresponding to that place in the sequence, which would seem like a decent place to use indexOf(); however, since each button will appear multiple times, indexOf will stop looking at the array once it sees a single instance of the button you've pressed. For that reason, an iterating number is concatenated onto the end of each button as it's added into the sequence array, so that the exact position can be looked up easily.

The playSequence() function also uses the forEach method for every item in the sequence array. Fun fact, to my understanding this tries to run every function described therein at the same time. By itself, this would mean that the computer tries to press every button at once. To fix this, one has interpolate into setTimeout a number of seconds times that elements place in the sequence.

#####

#####

all external code inspirations are listed at the top of App.js

#####

#####

-- The background images are simply called from miscellaneous urls, but the sounds are stored on Firebase.
