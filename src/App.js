// import logo from './logo.svg';

import {useState} from 'react';
import './App.css';

//make empty list
const defaultList = [
  ['R','E','A','C','T'],
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
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
  ]

// console.log(defaultList)
function App() {
  //data for guesslist 
  const [wordleGuessList,setWordleGuessList] = useState([...defaultList])
  const [letterGuess,setLetterGuess] = useState([...keyboardList])
  return (
    <div className="App">
      <header className='App-header'>
        <WordleHeader/>
        {/* <WordleGrid wordleGuessList={wordleGuessList}/> */}
        <WordleKeyboard letterGuess={letterGuess}/>
      </header>
    </div>
  );
}

//random list
// let wordList = ['hello', 'there', 'donor', 'array']
// let randomWord = wordList[Math.floor(Math.random() * wordList.length)]
// console.log(randomWord)


const WordleHeader = () => {
  return (
    <h1 className='wordle-header'>Wordle Copy</h1>
  )
}

const WordleGrid = (props) => {
  return (
    <div className='wordle-grid'>
      {props.wordleGuessList.map((wordleGuess) => {
          return (
           <WordleGridRow wordleGuess={wordleGuess}/>
          )
      })}
    </div>
  )
}

const WordleGridRow = (props) => {
  return (
     <div className='wordle-grid-row'>
        {props.wordleGuess.map((wordleLetter) => {
            return (
                <WordleGridLetter wordleLetter={wordleLetter} isCorrect={wordleLetter === 'E'}/>
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
      {props.letterGuess.map((keyboardRow) => {
        return (
          <KeyboardRow keyboardRow={keyboardRow} />
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
          <KeyboardLeter keyboardLetter={keyboardLetter}/>
        )
      })}
    </div>
  )
}

const KeyboardLeter = (props) => {
  return(
    <div className='keyboard-grid-char'>
      {props.keyboardLetter}
    </div>
  )
}
export default App;
