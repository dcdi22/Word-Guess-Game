// Grab reference to DOM elements
var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
//Sounds
var loseSound = document.getElementById("loseSound");
var winSound = document.getElementById("winSound");
var startSound = document.getElementById("startSound");
var correctSound = document.getElementById("correctSound");
var incorrectSound = document.getElementById("incorrectSound");

// Creat variables for game (wordbank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ["Fallout", "Horizon Zero Dawn", "Tomb Raider", "Assassins Creed", "Mortal Kombat", "Bioshock", "Life Is Strange", "Red Dead Redemption", "Last of Us", "Until Dawn", "The Witcher", "StarDew Valley"];
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var gameRunning = false;
var pickedWord = " ";
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];


// New game function to reset all stats, pick new word and create placeholders
function newGame() {
    // reset all game info
    gameRunning = true;
    guessesLeft = 9;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    //sound
    var startSoundFlag = true;
    //play sound
    if (startSoundFlag) {
        startSound.pause();
        startSound.currentTime = 0;
        startSound.play();
        startSoundFlag = false;
    };

    // Pick a new word 
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // Create Placeholders of new picked word
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            pickedWordPlaceholderArr.push(" ");//automatically creates spaces so User doesn't have to guess a space
        }
        else {
            pickedWordPlaceholderArr.push("_");
        }
    }

    // Write all the new game info to the DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join("");// this turns it back into a string so there's not all the commas
    $guessedLetters.textContent = incorrectLetterBank;

}

// letterGuess function takes in the letter you pressed and sees if it's in the selected word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // Run game logic
        guessedLetterBank.push(letter);

        // check if guessed letter is in my picked word
        for (var i = 0; i < pickedWord.length; i++) { 
            // convert both values to lowercase so I can compare them correctly
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                // if a match, swap out that character in the placeholder with actual character
                pickedWordPlaceholderArr[i] = pickedWord[i];
                //sound
                var correctSoundFlag = true;
                //play sound
                if (correctSoundFlag) {
                    correctSound.pause();
                    correctSound.currentTime = 0;
                    correctSound.play();
                    correctSoundFlag = false;
                };
            }
        }

        $placeholders.textContent = pickedWordPlaceholderArr.join("");//join is the same as .appendChild?
        checkIncorrect(letter);
        



    }
    else {
        if (!gameRunning) {
            alert("You need to press 'start' if you want to play")
        }
        else {
            alert("You've already guessed this letter, try a new one!")//Just gives user some feedback
        }
    }
}

// Check for incorrects(letter)
function checkIncorrect(letter) {
    // Check to see if letter DIDN"T make it into our pickedPlaceHolder (therefore, incorrect)
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1)  {
        // Decrement guesses
        guessesLeft--;
        // Add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
         //Write new bank of incorrect letters gussed to DOM
        $guessedLetters.textContent = incorrectLetterBank.join(" ");
        // Write new amount of guesses left to DOM
        $guessesLeft.textContent = guessesLeft;
        //sound
        var incorrectSoundFlag = true;
        //play sound
        if (incorrectSoundFlag) {
            incorrectSound.pause();
            incorrectSound.currentTime = 0;
            incorrectSound.play();
            incorrectSoundFlag = false;
        };
    }

    checkLose();
    checkWin();
} 


// checkLose
function checkLose() {
    if (guessesLeft <= 0) {
        var loseSoundFlag = true;
        losses++;
        $losses.textContent = losses;
        //play sound
        if (loseSoundFlag) {
            loseSound.pause();
            loseSound.currentTime = 0;
            loseSound.play();
            loseSoundFlag = false;
        };
        alert("Sorry, you lost");
        gameRunning = false;
    }
}


// checkWin
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join("").toLowerCase()) {
        var winSoundFlag = true;
        wins++;
        $wins.textContent = wins;
        //play sound
        if (winSoundFlag) {
            winSound.pause();
            winSound.currentTime = 0;
            winSound.play();
            winSoundFlag = false;
        };
        alert("Hooray, you won");
        gameRunning = false;
    }
}

// Add eventListener for new game button 
$newGameButton.addEventListener("click", newGame);

// Add onkeyup event to trigger letterGuess 
document.onkeyup = function(event) {
    //console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}