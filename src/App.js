// import logo from './logo.svg';

import {useState,useEffect} from 'react';
import './App.css';
import {answerList, wordList} from "./wordleWords.js"

//make empty list
const defaultList = [
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','','']
]
//make empty keyboard list
const keyboardList = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]
  ]

const gameStateList = ['playing','won','lost']

const letters = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"
  ]

function App() {
  //data for guesslist 
  const pickWordleAnswer = () => {
  const randomWord = answerList[Math.floor(Math.random() * answerList.length)]
  return randomWord
  }
  const [wordleGuessList,setWordleGuessList] = useState(JSON.parse(JSON.stringify(defaultList))) 
  const [letterGuess,setLetterGuess] = useState([...keyboardList])
  const [wordleGuessIndex,setWordleGuessIndex] = useState(0)
  const [wordleLetterIndex,setWordleLetterIndex] = useState(0)
  const [wordleAnswer,setWordleAnswer] = useState(pickWordleAnswer())
  const [gameState,setGameState] = useState([...gameStateList][0])
  // console.log('answer outside func',wordleAnswer)
  
 
  useEffect(() => {
    window.addEventListener('keyup',handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  },[wordleLetterIndex,wordleGuessIndex]);

  const handleKeyPress = ({key}) => {
    //update wordleguesslist && letteridx && guessidx  -- create a deep copy  when it comes to nested arr/obj
    // console.log('key start',key)
    // const newGuessList = JSON.parse(JSON.stringify(wordleGuessList))
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
    // if(key === "backspace") {
    //   handleBackSpace();
    // } else if (key === 'enter') {
    //   handleEnterKey();
    // } else {
    //   handleKeyEvent(key);
    // }
    
  }
 
  //keyhandler functions
  const handleBackSpace = () => {
    console.log('handle backspace')
      if(wordleLetterIndex === 0) return; //do nothing once it reaches zero
      const newGuessList = JSON.parse(JSON.stringify(wordleGuessList))
      newGuessList[wordleGuessIndex][wordleLetterIndex - 1] = ''
      setWordleLetterIndex(wordleLetterIndex - 1)
      setWordleGuessList(newGuessList)
    
  }
  const handleEnterKey = () => {
    if (wordleLetterIndex !== 5) return; // stop until it gets to the last letter in the row   
    
    const newGuessList = JSON.parse(JSON.stringify(wordleGuessList))
    // console.log(newGuessList[wordleGuessIndex])
    const guess = newGuessList[wordleGuessIndex].join('').toLowerCase()

    if(checkIsValidGuess(guess)) {
      checkAndUpdateGameState(guess)
      setWordleGuessIndex(wordleGuessIndex + 1)
      setWordleLetterIndex(0)
    } else {
      alert('Word Not Found')
    }
    
    
  }
  const handleKeyEvent = (key) => {
    
    if (wordleLetterIndex > 4) return; //until it gets to the second last letter in row
    const newGuessList = JSON.parse(JSON.stringify(wordleGuessList))
    //reassign char
    newGuessList[wordleGuessIndex][wordleLetterIndex] = key
    setWordleLetterIndex(wordleLetterIndex + 1)
    setWordleGuessList(newGuessList)
  }
  const checkAndUpdateGameState = (guess) => {
    
    if (guess === wordleAnswer) {
      //if won
      setGameState([...gameStateList][1])
      return;
    }
    if(wordleGuessIndex === 5) {
      //if lost(at the end of the guesses)
      setGameState([...gameStateList][2])
      //move to the next game
      return;
    } 
    setGameState([...gameStateList][0])
    return 
      
    
  }
  const checkIsValidGuess = (guess) => {
    // console.log(wordleAnswer.includes(guess.toLowerCase()))
    if (!answerList.includes(guess) && !wordList.includes(guess)) {
      return false
    }
    
    return true
  }
  const changeColor = (guess) => {
    //change classname to true/false  if guess idx and answer index are the same
    //wordleguessidx, letteridx
    let answerSplit = wordleAnswer.split('')
    guess = guess.toLowerCase().split('')
    // for(let i = 0 ; i < )
    console.log('answer',answerSplit)
    console.log('guess',guess)
  }
  // const isCorrect = (guess) => {
  //   let answerSplit = wordleAnswer.split('')
  //   guess = guess.toLowerCase().split('')
  //   // console.log('answer',answerSplit)
  //   // console.log('guess',guess)
  //   answerSplit.forEach((letter,index) => {
  //     console.log(letter)
  //   })
  // }
  return (
    <div className="App" >
      <header  className='App-header' >
         
        <WordleHeader />
        <h1>Answer: {wordleAnswer}</h1>  
        <h2>GameState: {gameState}</h2>
        <WordleGrid wordleGuessList={wordleGuessList} />
        <WordleKeyboard letterGuess={letterGuess} handleKeyPress={handleKeyPress} handleBackSpace={handleBackSpace}/>
      </header>
    </div>
  );
}

const WordleHeader = () => {
  return (
    <h1 className='wordle-header'>Wordle Copy</h1>
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

const WordleGridRow = (props) => {
  return (
     <div className='wordle-grid-row'>
        {props.wordleGuess.map((wordleLetter,index) => {
            return (
                <WordleGridLetter key={`wordleLetter-${index}`} wordleLetter={wordleLetter} isCorrect={wordleLetter === 'e'} />
            )
        })}
      </div>
  )
}

const WordleGridLetter = (props) => {
  return (
     <div className={`wordle-grid-char wordle-grid-char-${props.isCorrect}`} >
      {props.wordleLetter}
    </div>
  )
}

const WordleKeyboard = (props) => {
  
  return (
    <div className='keyboard-grid'>
      {props.letterGuess.map((keyboardRow,index) => {
        return (
          <KeyboardRow key={keyboardRow} keyboardRow={keyboardRow} handleKeyPress={props.handleKeyPress}  />
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
          <KeyboardLeter key={keyboardLetter} keyboardLetter={keyboardLetter} handleKeyPress={props.handleKeyPress} />
        )
      })}
    </div>
  )
}

const KeyboardLeter = (props) => {
  const clickKey = {key:props.keyboardLetter}
  return(
    <div className='keyboard-grid-char' onClick={()=> props.handleKeyPress(clickKey) } >
      {props.keyboardLetter}
    </div>
  )
}


// const letters = [
//     "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"
//   ]

//   useEffect(() => {
//     window.addEventListener("keyup", handleKeyPress);
//     return () => {
//       window.removeEventListener("keyup", handleKeyPress);
//     };
//   }, [wordleLetterIndex, wordleGuessIndex]);

//   const handleKeyPress = ({key}) => {
//     if (key === "Enter") {
//       console.log("Enter key handler")
//     }
//     if (key === "Backspace") {
//       console.log("Backspace key handler")
//     }
//     if (letters.includes(key.toUpperCase())) {
//       handleKeyEvent(key.toUpperCase())
//     }
//   }

//   const handleKeyEvent = (newLetter) => {
//     console.log("handleKeyEvent ", newLetter)
//   }
//useEffect - runs once when page loads and whenever you want, mostly used for API(fetch)
// function useKeyPress(targetKey, handler) {
//   const upHandler = ({ key }) => {
//     console.log(key)
//     if (key === targetKey) {
//       handler(key)
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keyup", upHandler);
//     return () => {
//       window.removeEventListener("keyup", upHandler);
//     };
//     }, []); 
// }
// console.log(answerList)


export default App;
