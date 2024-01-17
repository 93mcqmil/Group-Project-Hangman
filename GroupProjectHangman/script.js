let word = "";

const guessedLetters = [];

function hangmanGame() {
  const listOfWords = [
    "january",
    "monday",
    "elephant",
    "summer",
    "lawyer",
    "school",
  ];
  word = listOfWords[Math.floor(Math.random() * listOfWords.length)];
  linesForLetterInWord(word);
  const userGuess = document.querySelector("#forguessbutton");
  userGuess.addEventListener("click", userLetter);
}

function linesForLetterInWord(word) {
  const letterList = document.querySelector("#letterlist");
  for (let i = 0; i < word.length; i++) {
    const letterItem = document.createElement("li");
    letterItem.innerText = "_";
    letterList.append(letterItem);
  }
}

hangmanGame();

function userLetter() {
  let letter = document.querySelector("#forguess").value;
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter")
  ) {
    if (
      letter.length === 1 &&
      letter.match(/[a-z]/i) &&
      guessedLetters.indexOf(letter) === -1
    ) {
      guessedLetters.push(letter);
      testGuessLetter(letter);
    } else if (guessedLetters.indexOf(letter) !== -1) {
      const wordContainer = document.querySelector(".wordcontainer");
      const pElement = document.createElement("p");
      pElement.innerText = "You've already guessed this letter!";
      pElement.classList.add("sameletter");
      wordContainer.appendChild(pElement);

      setTimeout(function () {
        wordContainer.removeChild(pElement);
      }, 3000);
    } else {
      alert("Wrong input! Enter only (1) letter without special characters.");
    }
    document.querySelector("#forguess").value = "";
    document.querySelector("#forguess").focus();
  }
}

document.querySelector("#forguessbutton").addEventListener("click", userLetter);
document.querySelector("#forguess").addEventListener("keydown", userLetter);

let wrongGuesses = 0;

function handleWrongGuess() {
  wrongGuesses++;
  if (wrongGuesses === 1) {
    document.getElementById("head").style.display = "block";
  } else if (wrongGuesses === 2) {
    document.getElementById("body").style.display = "block";
  } else if (wrongGuesses === 3) {
    document.getElementById("arms").style.display = "block";
  } else if (wrongGuesses === 4) {
    document.getElementById("legs").style.display = "block";
  } else {
    alert("Something went wrong, restart the game and try again!");
  }
}

const maxWrongGuesses = 4;
const guessWordArray = new Array(word.length);

function testGuessLetter(letter) {
  let found = false;
  for (let i = 0; i < word.length; i++) {
    if (letter.toLowerCase() === word[i]) {
      let k = i + 1; // Use k = i + 1 because nth:child start at 1 and cant do i + 1 inside queryselctor.
      let placeNewLetter = document.querySelector(
        "#letterlist li:nth-child(" + k + ")"
      );
      placeNewLetter.innerText = letter.toLowerCase();
      guessWordArray[i] = letter.toLowerCase();
      found = true;
    }
    let guessWordArrayString = guessWordArray.join("");
    if (word === guessWordArrayString) {
      setTimeout(function () {
        alert(`You won, play again? 😍 `);
        newGame();
      }, 500);
    }
  }
  if (!found) {
    handleWrongGuess();
    if (wrongGuesses === maxWrongGuesses) {
      document.getElementById("legs");
      setTimeout(function () {
        alert(
          `You lost unfortunately 😕, the corect word was: ${word}! Try again? 😍 `
        );
        newGame();
      }, 500);
    }
  }
}

function newGame() {
  wrongGuesses = 0;
  document.getElementById("head").style.display = "none";
  document.getElementById("body").style.display = "none";
  document.getElementById("arms").style.display = "none";
  document.getElementById("legs").style.display = "none";
  linesForLetterInWord(wrongGuesses)
  window.location.reload();
}
