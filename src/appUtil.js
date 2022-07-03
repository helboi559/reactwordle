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

export const checkIsValidGuess = (guess) => {
    // console.log(wordleAnswer.includes(guess.toLowerCase()))
    if (!answerList.includes(guess) && !wordList.includes(guess)) {
      return false
    }
    return true;
}

export const deepCopy = (info) => {
    return JSON.parse(JSON.stringify(info))
}

//count grey instances and change color
export const countGuessResult = (guessWordArr,wordleAnswer) => {
    //make counters for each letter to determine color
    const answerLetterCount = {}
    const guessLetterCount = {}
    
    const guessWordArrCopy = deepCopy(guessWordArr)
    
    //change all colors to grey in guess && keep letter count
    for(let i = 0 ; i < guessWordArr.length ; i++) {
        guessWordArrCopy[i] = {...guessWordArrCopy[i],color:'grey'}
        const answerLetterCopy = wordleAnswer[i].toLowerCase()
        if (answerLetterCount[answerLetterCopy] === undefined) {
            answerLetterCount[answerLetterCopy] = 1
        } else {
            answerLetterCount[answerLetterCopy] ++
        }
    }
    // console.log("answerLetterCount",answerLetterCount)
    //green and yellow check
     for(let i = 0 ; i < guessWordArr.length ; i++) {
         const guessLetterCopy = guessWordArr[i].letter.toLowerCase()
         console.log(wordleAnswer[i] , guessLetterCopy)
         if (guessLetterCount[guessLetterCopy] === undefined) {
             guessLetterCount[guessLetterCopy] = 1
         }
         if (wordleAnswer[i] === guessLetterCopy) {
            guessWordArrCopy[i]= {...guessWordArrCopy[i], color:'green'}
            guessLetterCount[guessLetterCopy] --;
         } 
         if (answerLetterCount[guessLetterCopy] !== undefined && guessLetterCount[guessLetterCopy] > 0) {
             guessWordArrCopy[i] = {
                 ...guessWordArrCopy[i],
                 color:'yellow'
             }
             guessLetterCount[guessLetterCopy]--
         }
       
     }
     console.log("guessLetterCount",guessLetterCount)
    return guessWordArrCopy;
}

