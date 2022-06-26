import {answerList, wordList} from "./wordleWords.js"


//create tiles that include letter and color variables
export const createdWordleLetter = (letter,color) => {
    return {letter,color}
}

export const createEmptyGuessList = (numLetters,numGuesses) => {
    const newList = []
    for(let i = 0 ; i < numGuesses ; i++) {
        //create empty word with a specific range
        const guess = Array.from({length:numLetters}, () => 
            createdWordleLetter('',null)
        )
        newList.push(guess)
    }
    return newList;
}

// export const dayIncrementor = () => {
//   const startDate = new Date("6-10-2022");
//   const today = new Date();
//   const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
//   return days;
// };

export const pickWordleAnswer = () => {
  const randomWord = answerList[Math.floor(Math.random() * answerList.length)]
  return randomWord
  }
// console.log(dayIncrementor)
export const GAME_STATE_ENUM = {
  playing:"PLAYING",
  won:'WON',
  lost:'LOST'
}

export const deepCopy = (info) => {
    return JSON.parse(JSON.stringify(info))
}