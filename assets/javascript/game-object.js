// Grab reference to DOM elements
var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

var game = {
    wordBank: ["Fallout", "Horizon Zero Dawn", "Tomb Raider", "Assassins Creed", "Mortal Combat", "Bioshock", "Life Is Strange", "Red Dead Redemption", "Last of Us"],
    wins: 0,
    losses: 0,
    guessesLeft: 9,
    gameRunning: false,
    pickedWord: " ",
    pickedWordPlaceholderArr: [],
    guessedLetterBank: [],
    incorrectLetterBank: [],
    newGame: function () {
        // reset all game info
        this.gameRunning = true;
        this.guessesLeft = 9;
        this.guessedLetterBank = [];
        this.incorrectLetterBank = [];
        this.pickedWordPlaceholderArr = [];

        // Pick a new word 
        this.pickedWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];

        // Create Placeholders of new picked word
        for (var i = 0; i < this.pickedWord.length; i++) {
            if (this.pickedWord[i] === " ") {
                this.pickedWordPlaceholderArr.push(" ");//automatically creates spaces so User doesn't have to guess a space
            }
            else {
                this.pickedWordPlaceholderArr.push("_");
            }
        }

        // Write all the new game info to the DOM
        $guessesLeft.textContent = this.guessesLeft;
        $placeholders.textContent = this.pickedWordPlaceholderArr.join("");// this turns it back into a string so there's not all the commas
        $guessedLetters.textContent = this.incorrectLetterBank;
    },
    letterGuess: function (letter) {
        if (this.gameRunning === true && this.guessedLetterBank.indexOf(letter) === -1) {
            // Run game logic
            this.guessedLetterBank.push(letter);

            // check if guessed letter is in my picked word
            for (var i = 0; i < this.pickedWord.length; i++) {
                // convert both values to lowercase so I can compare them correctly
                if (this.pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                    // if a match, swap out that character in the placeholder with actual character
                    this.pickedWordPlaceholderArr[i] = this.pickedWord[i];
                }
            }

            $placeholders.textContent = this.pickedWordPlaceholderArr.join("");//join is the same as .appendChild?
            this.checkIncorrect(letter);


        }
        else {
            if (!this.gameRunning) {
                alert("You need to press 'start' if you want to play")
            }
            else {
                alert("You've already guessed this letter, try a new one!")//Just gives user some feedback
            }
        }
    },
    // Check for incorrects(letter)
    checkIncorrect: function(letter) {
    // Check to see if letter DIDN"T make it into our pickedPlaceHolder (therefore, incorrect)
        if (this.pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && this.pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1)  {
        // Decrement guesses
        this.guessesLeft--;
        // Add incorrect letter to incorrectLetterBank
        this.incorrectLetterBank.push(letter);
         //Write new bank of incorrect letters gussed to DOM
        $guessedLetters.textContent = this.incorrectLetterBank.join(" ");
        // Write new amount of guesses left to DOM
        $guessesLeft.textContent = this.guessesLeft; 
    }

    this.checkLose();
    this.checkWin();
}, 
    // checkLose
    checkLose: function () {
        if (this.guessesLeft <= 0) {
            this.losses++;
            $losses.textContent = this.losses;
            alert("Sorry, you lost");
            this.gameRunning = false;
            $placeholders.textContent = this.pickedWord;
        }
    },
    // checkWin
    checkWin: function () {
        if (this.pickedWord.toLowerCase() === this.pickedWordPlaceholderArr.join("").toLowerCase()) {
            this.wins++;
            $wins.textContent = this.wins;
            alert("Hooray, you won");
            this.gameRunning = false;
        }
    },

};

// Add eventListener for new game button 
$newGameButton.addEventListener("click", function () {
    game.newGame();
});

// Add onkeyup event to trigger letterGuess 
document.onkeyup = function (event) {
    //console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        game.letterGuess(event.key);
    }
};