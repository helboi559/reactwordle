# Wordle

## Rules

1. 5 letters only
2. 6 tries
3. green char means correct spot/yellow means incorrect spot/grey means not in any spot
4. similar correct chars allowed

![example](./pictures/wordle_sample.png)

## Approach

- Have user input limited to 6 tries

- compare random generated word with user input and check for:

  - case sensitivity/non char input (0-9) & (@#%%^)/duplicate correct numbers
  - previous correct/incorrect char index positions
  - input word in list

- display input for user to see of all 6 rounds

## Code

1. create display of user input as they type (6) input texts and save input to compare.

Round sample - actual word vs try 1 > actual word vs try 2 and try 1 > actual word vs try 1/2/3 ...

- create text inputs and trigger color changes (green/grey/yellow) by character - EACH ROUND INDEPENDENT OF EACH OTHER

Sample overlay Siblings (actual word - input word)

```js
//actual word === input word 1-6) - siblings

//input word 1-6 (chars 1-5) - children
```

-## Requirements (Week 1 - Front End)------------------------------

- {Instructor} Introduce students to Wordle, css in React, Flex-box, key
- Create a new github repo called wordleclone, clone the repo to your computer and add the link to populi
- First we will be creating the react components needed without hooking them up to the core functionality of the application.
- Create two new react components <WordleGrid> and <WordleKeyboard> and give them a simple html return statement:
  - const WordleGrid = (props) => {
    return (
    <div>
    WordleGrid
    </div>
    )
    }
  - const WordleKeyboard = (props) => {
    return (
    <div>
    WordleKeyboard
    </div>
    )
    }
- Add <WordleGrid> and <WordleKeyboard> to the <App> component return statement, you should see these two components in your browser now.
- In <App>, create two new state variables with accompanying setter functions: wordleGuessList and letterGuess.
  - wordleGuessList should be initialized to an array of 6 sub-array's (that we'll call wordleGuess), where each sub-array contains 5 empty strings (that we'll call wordleLetter):
    - [
      ["R", "E", "A", "C", "T"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ]
    - We're going to set one of the wordleGuess array's to be a word so we can get the css correct. Later, we can set this first array back to empty.
  - letterGuess should be initialized to an empty string ""
  - Pass wordleGuessList (but not setwordleGuessList) into <WordleGrid>
  - Pass letterGuess, setLetterGuess, wordleGuessList and setwordleGuessList into <WordleKeyboard> as a prop. Note: we have passed wordleGuessList into both <WordleGrid> and <WordleKeyboard> as a prop because we will need access to the wordleGuessList variable in both components since <WordleGrid> will be displaying wordleGuessList and <WordleKeyboard> will be modifying wordleGuessList
- We now need to display the wordleGuessList array of sub-array's as a grid of empty guess boxes in the <WordleGrid> component.
  - Create two new components <WordleGridRow> and <WordleGridLetter>
  - In <WordleGrid>, map through props.wordleGuessList to iterate through the wordleGuess sub-array's. This map should return the component <WordleGridRow> 6 times, one for each sub-array in props.wordleGuessList. The map function's first parameter should be named wordleGuess. Pass wordleGuess into the <WordleGridRow> component as a prop.
    - {props.wordleGuessList.map((wordleGuess)=>{
      return (
      <WordleGridRow wordleGuess={wordleGuess} />
      )
      })}
  - In <WordleGridRow>, map through props.wordleGuess. The map function's first parameter should be named wordleLetter. Return the <WordleGridLetter> component from this map function. Pass wordleLetter into the <WordleGridLetter> component as a prop.
    - {props.wordleGuess.map((wordleLetter)=>{
      return (
      <WordleGridLetter wordleLetter={wordleLetter} />
      )
      })}
  - Modify <WordleGridLetter> to display props.wordleLetter to the page as a letter inside a box.
  - If you did everything correctly, you should see a list of boxes display to the page. The first 5 should contain the letters R, E, A, C, and T. The rest (25 empty boxes out of 30 total boxes), should be empty boxes.
- We now need to create a front end component for our <WordleKeyboard>
  - Create a new variable keyList (does not have to be a state variable), that contains a list of clickable keys in our keyboard organized into sub-array row's.
    - const keyList = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
      ]
  - Create two new components <KeyboardRow> and <KeyboardLetter>
  - Map through keyList to display 3 <KeyboardRow>'s and then map through <KeyboardRow> to display the sub-array of <KeyboardLetter>'s. Hint: these two components should function very similarly to <WordleGridRow> and <WordleGridLetter> respectively.
- Style you Wordle Clone grid and keyboard to appear like the real Wordle grid and keyboard.
  - Note: You do not need to have the exact css/styling of the real wordle. As long as you have your keyboard displaying in a similar manner as they do and you have wordleGuessList displaying in a 6 x 5 grid of wordle guesses and wordle letters, that is sufficient.
  - Hint: let flex-box do the heavy lifting here.
    - <WordleGrid> and <WordleKeyboard> should be display: flex, flex-direction: column
    - <WordleGridRow> and <KeyboardRow> should be display: flex, flex-direction: row
- If you did everything right, you should see a front-end very similar to Wordle except the first guess is the letters R, E, A, C, and T (see attached screenshot). Do not worry about the functionality yet, that will be the next assignment.
- Stretch goal: modify <WordleGridLetter> to take in a prop that sets the color of the wordleLetter box to either grey, green or yellow.

----------- FUNCTIONALITY ------------------------------

- Add the provided wordleWords.js file to the project on the same hierarchical level as App.js. Import the two variables answerList and wordList into App.js.
  - import {answerList, wordList} from "./wordleWords.js"
  - answerList is an array containing all possible wordle answer words.
  - wordList is an array containing all possible valid word guesses a user can make.
  - Yes, these two arrays are hardcoded in the real game. Yes, the real Wordle merely increments through answerList in order to provide a new hidden answer per day (so it's very easy to cheat if you look into the wordle front end javascript bundle).
- Add the following state variables to <App>
  - wordleGuessIndex
    - This state variable will be a number defaulted to 0. This number represents the index of the wordleGuess array the user is currently modifying.
  - wordleLetterIndex
    - This state variable will be a number defaulted to 0. This number represents the index of the wordleLetter in the wordleGuess array the user is currently modifying.
  - wordleAnswer
    - This state variable will be a string that should be defaulted to pickWordleAnswer().
    - const [wordleAnswer, setWordleAnswer] = useState(pickWordleAnswer())
  - gameState
    - This state variable will be a string defaulted to "playing". This variable represents the current state of our game as the user is playing. This variable can have 3 possible values: "playing", "won", "lost".
- Implement the following as functions inside the <App> component with the described functionality.
- handleKeyPress(key){}
  - This function should be invoked when the user either types a letter or clicks one of the buttons on the keyboard besides "enter" and "backspace".
  - When invoked, handleKeyPress should update wordleGuessList with the inputted letter at the indexes of wordleGuessIndex and wordleLetterIndex.
  - Additionally, this function should increment wordleLetterIndex by 1 unless wordleLetterIndex has a value greater than or equal to 4.
  - I.E. If the user enters the letter "a" and they are guessing the second letter of the third word in the guess list, wordleLetterIndex should be 2 and wordleGuessIndex should be 3. That empty string in wordleGuessList should be set to the letter "a". Addtionally, wordleLetterIndex should be incremented to 3. If the user is attempting to enter a letter and the wordleLetterIndex is already at 4, I.E. we have reached the end of our word, this function should do nothing else.
- handleBackspace(){}
  - This function should be invoked when the user types the backspace key or clicks the "backspace" button on the wordle keyboard.
  - When invoked, handleBackspace should:
    - Decrement wordleLetterIndex by 1 unless wordleLetterIndex has a value equal to 0.
    - Set the letter at wordleLetterIndex (after decrementing by 1) in the current wordleGuessIndex array to be an empty string.
  - I.E. We want to do the opposite functionality of handleKeyPress. Go back a single letter in the current guess and erase it.
- pickWordleAnswer(){}
  - This function should return a random string from answerList.
  - Optionally, you can pass a single parameter into pickWordleAnswer(). The parameter should be a number and will override the random string functionality by returning a word from answerList at the inputted index (useful for testing and debugging).
- checkAndUpdateGameState(){}
  - This function will be invoked by handleEnterKey().
  - When invoked, it should check the following conditions and update the gameState state variable accordingly.
    - Does the word in the current wordleGuessIndex array match the wordleAnswer?
      - If yes, set gameState to "won"
    - Has the user reached their maximum number of guesses (I.E. wordleGuessIndex is equal to 6)?
      - If yes, set gameState to "lost"
    - If the above two conditions are false, keep gameState as "playing"
- checkIsValidGuess(guess){}
  - This function will be invoked by handleEnterKey().
  - When invoked, it should check that the inputted guess word is a valid guess by checking if the word exists in the wordList array.
    - If the guess is valid, return true
    - If the guess is invalid, return false
  - Optionally, this function could also perform the check to see if the word is 5 letters long and return false if it isn't, BEFORE checking if the word is in the wordList array.
- handleEnterKey(){}
  - This function should be invoked when the user types the enter key or clicks the "enter" button on the wordle keyboard.
  - This function should do the following:
    - Use checkIsValidGuess(guess) to validate of the user's current guess is valid or not. If it is valid, continue on. If it isn't, display an error message to the user and do not continue on.
    - Use checkAndUpdateGameState() to check if the user has won, lost, or is still playing and update the gameState accordingly.
    - If the user is still playing (I.E. gameState is still "playing"), increment wordleGuessIndex by 1 and set wordleLetterIndex to 0 (I.E. move onto the first letter of the next guess)
- Stretch Goal (the tough part): Once a user has invoked handleEnterKey() and the gameState is still set to "playing", it means that the last guess the user made is either partially or totally incorrect. Implement functionality to set the letters of the guessed word in the wordleGrid to either grey, green or yellow. Grey for a letter that is not in wordleAnswer. Yellow for a letter that is in wordleAnswer but is not in the correct position (index). Green for a letter that is in the wordleAnswer and is in the correct position (index). There are many ways to implement this functionality. Feel free to change any state variables or functionality in the application to implement this feature.
