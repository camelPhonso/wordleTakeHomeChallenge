const word = "hired";

const gameBoard = document.querySelector(".gameboard");
const letterBoxes = document.querySelectorAll(".gameboard__square");
let emptySpace = 1;

function resetEmptySpace() {
    if (emptySpace >= 1 && emptySpace <= 5) emptySpace += 1;
    if (emptySpace === 6) emptySpace = 1;
}

function isIncluded(letter){
    let correctArray = word.split('');
    correctArray.includes(letter);
}

function clearGuess(){
    letterBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.backgroundColor = 'black';
            box.textContent = '';
        }, index * 200)
    });
    emptySpace = 1;
}

function checkUserGuess() {
    let correctArray = word.split('');
    let guessArray = [];
    letterBoxes.forEach((letter, index) => {
            guessArray.push(letter.textContent);
        });
    
    for (let i = 0; i < guessArray.length; i++){
        if(correctArray.includes(guessArray[i])){
            if(correctArray[i] === guessArray[i]){
                setTimeout(() => {
                    letterBoxes[i].style.backgroundColor = 'green';
                }, i * 200)
            }else{
                setTimeout(() => {
                    letterBoxes[i].style.backgroundColor = 'pink';
                }, i * 200)
            }
        }else{
            setTimeout(()=>{
                letterBoxes[i].style.backgroundColor = 'grey';
            }, i * 200)
        }
        
    };
}

// event handling /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
document.addEventListener("keydown", (e) => {
    let isValidCharacter = e.keyCode >= 65 && e.keyCode <= 90;
    let firstEmptyBox = document.getElementById(String(emptySpace));
    
    //submitting characters
    if (isValidCharacter && emptySpace < 5){
        firstEmptyBox.textContent = e.key;
        resetEmptySpace();
    };

    if(isValidCharacter && emptySpace === 5){
        document.getElementById(String(emptySpace)).textContent === '' ? 
        firstEmptyBox.textContent = e.key : 
        window.alert('Only five-letter words are possible. Replace letters or submit your guess.');
    }

    // deleting characters
    if(e.key === 'Backspace'){
        if(emptySpace > 1 && emptySpace < 5){
            emptySpace = emptySpace - 1;
        };

        if(emptySpace === 5 && firstEmptyBox.textContent === ''){
            emptySpace = emptySpace - 1;
        };

        document.getElementById(String(emptySpace)).textContent = '';
    }

    // submitting a guess
    if(e.key === 'Enter'){
        let lastBox = document.getElementById('5');
        if(lastBox.textContent === ''){
            window.alert('Your guess must be at least 5 letters long');
        }else{
            checkUserGuess();
            setTimeout(clearGuess, 3000);
        }
    }

});
