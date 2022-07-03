import {useState,useEffect} from 'react';
import './App.css';
import {
  pickWordleAnswer,
  GAME_STATE_ENUM,
  createdWordleLetter,
  createEmptyGuessList,
  deepCopy,
  checkIsValidGuess,
  countGuessResult,
} from "./appUtil"

const keyboardList = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]
  ]

const letters = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"
  ]

function App() {
  //data for guesslist 
  const wordGuesses = 6;
  const letterGuessPer = 5
  const wordleAnswerToday = pickWordleAnswer();
  const [wordleGuessList,setWordleGuessList] = useState(deepCopy(createEmptyGuessList(letterGuessPer,wordGuesses))) 
  const [wordleAnswer,setWordleAnswer] = useState(wordleAnswerToday)
  const [wordleGuessIndex,setWordleGuessIndex] = useState(0)
  const [wordleLetterIndex,setWordleLetterIndex] = useState(0)
  const [gameMessage,setGameMessage] = useState('')
  
  const [gameState,setGameState] = useState(GAME_STATE_ENUM.playing)
  // console.log('answer outside func',wordleAnswer)
  const [wordIndexMatch,setWordIndexMatch] = useState(false)
 
  useEffect(() => {
    window.addEventListener('keyup',handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  },[wordleLetterIndex,wordleGuessIndex]);

   //keyhandler functions
  const handleKeyPress = ({key}) => {
    // console.log(key)
    if (key === "Enter") {
      // console.log('if enter', key)
      handleEnterKey();
    }
    if (key === "Backspace") {
      // console.log("Backspace key handler")
      // console.log('if backspace', key)
      handleBackSpace()
    }
    if (letters.includes(key.toUpperCase())) {
      handleKeyEvent(key.toUpperCase())
      // console.log('handle other keys', key)
    }
   
    
  }
 
  const handleBackSpace = () => {
    // console.log('handle backspace')
      if(wordleLetterIndex === 0) return; //do nothing once it reaches zero
      const newGuessList = deepCopy(wordleGuessList)
      newGuessList[wordleGuessIndex][wordleLetterIndex - 1] = ''
      setWordleLetterIndex(wordleLetterIndex - 1)
      setWordleGuessList(newGuessList)
    
  }
  const handleEnterKey = () => {
    if (wordleLetterIndex !== 5) return; // stop until it gets to the last letter in the row   
    
    const newGuessList = deepCopy(wordleGuessList)
    
    const guessWord = newGuessList[wordleGuessIndex]
    // console.log('guessWord',guessWord)
    //convert letters to word  compare (case-sensetive)
    const guess = guessWord.map(({letter}) => letter).join('').toLowerCase('')
    // console.log('guessWord',guess)
    //if guess exists
    if(checkIsValidGuess(guess)) {
      checkAndUpdateGameState(guess)
      //reassign word obj by colors
      const calcGuessResult = countGuessResult(guessWord,wordleAnswer)
      newGuessList[wordleGuessIndex] = calcGuessResult
      setWordleGuessList(newGuessList)
      setWordleGuessIndex(wordleGuessIndex + 1)
      setWordleLetterIndex(0)
    } else {
      // set message to try again
      setGameMessage('Word is not in list, try again!')
    }
    
    
  }
  const handleKeyEvent = (letter) => {
    const newKey = createdWordleLetter(letter.toUpperCase(),null)
     //until it gets to the second last letter in row
    const newGuessList = deepCopy(wordleGuessList);

    //reassign char
    // console.log('handleKeyEvent',wordleLetterIndex,key)
    // console.log('answer',wordleAnswer[wordleLetterIndex])
    
    newGuessList[wordleGuessIndex][wordleLetterIndex] = newKey
    if (wordleLetterIndex === 5) return;
    setWordleGuessList(newGuessList)
    setWordleLetterIndex(wordleLetterIndex + 1)
    
  }

  const checkAndUpdateGameState = (guess) => {
    
    if (guess === wordleAnswer) {
      //if won
      setGameState(GAME_STATE_ENUM.won)
      return;
    }
    if(wordleGuessIndex === 5) {
      //if lost(at the end of the guesses)
      // setGameState([...gameStateList][2])
      setGameState(GAME_STATE_ENUM.lost)
      //move to the next game
      return;
    } 
    // setGameState([...gameStateList][0])
    setGameState(GAME_STATE_ENUM.playing)
    return 
      
    
  }
 
 
  return (
    <div className="App" >
      <header  className='App-header' >
         
        <WordleHeader />
        <h1>Answer: {wordleAnswer}</h1>  
        <h2>GameState: {gameState}</h2>
        <h4>Game Message: {gameMessage}</h4>
        <WordleGrid wordleGuessList={wordleGuessList} />
        <WordleKeyboard keyboardList={keyboardList} handleKeyEvent={handleKeyEvent} />
      </header>
    </div>
  );
}

const WordleHeader = () => {
  return (
    <h1 className='wordle-header'>Wordle Copy</h1>
  )
}


const WordleGridLetter = (props) => {
  return (
     <div className={`wordle-grid-char wordle-grid-char-${props.wordleLetter.color? props.wordleLetter.color : 'none'}`} >
      {props.wordleLetter.letter}
    </div>
  )
}


const WordleGridRow = (props) => {
  return (
     <div className='wordle-grid-row'>
        {props.wordleGuess.map((wordleLetter,index) => {
            return (
                <WordleGridLetter key={`wordleLetter-${index}`} wordleLetter={wordleLetter} />
            )
        })}
      </div>
  )
}

const WordleGrid = (props) => {
  return (
    <div className='wordle-grid'>
      {props.wordleGuessList.map((wordleGuess,index) => {
          return (
            <WordleGridRow key={`wordleGuess-${index + 1}`} wordleGuess={wordleGuess} />
          )
      })}
    </div>
  )
}
const WordleKeyboard = (props) => {
  
  return (
    <div className='keyboard-grid'>
      {props.keyboardList.map((keyboardRow,index) => {
        return (
          <KeyboardRow key={keyboardRow} keyboardRow={keyboardRow} handleKeyEvent={props.handleKeyEvent}  />
        )
      })}
    </div>
    
  )
}

const KeyboardRow = (props) => {
  return (
    <div className='keyboard-grid-row'>
      {props.keyboardRow.map((keyboardLetter) => {
        return (
          <KeyboardLeter key={keyboardLetter} keyboardLetter={keyboardLetter} handleKeyEvent={props.handleKeyEvent} />
        )
      })}
    </div>
  )
}

const KeyboardLeter = (props) => {
  
  return(
    <div className='keyboard-grid-char' onClick={()=> props.handleKeyEvent(props.keyboardLetter) } >
      {props.keyboardLetter}
    </div>
  )
}





export default App;
