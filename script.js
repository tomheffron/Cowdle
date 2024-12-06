// Sample data structure for cow breeds and images
const cowBreeds = {
    'Holstein': ['cows/holstein.jpg', 'cows/holstein2.jpg', 
        'cows/holstein3.jpg', 'cows/holstein4.jpg'],
    'Brahman': ['cows/brahman.jpg', 'cows/brahman2.jpg', 
        'cows/brahman3.jpg', 'cows/brahman4.jpg'],
    'Angus': ['cows/angus.jpeg', 'cows/angus2.jpg', 
        'cows/angus3.jpg', 'cows/angus4.jpeg'],
    'Aussie Red': ['cows/aussie_red.jpeg', 'cows/aussie_red2.jpeg', 
        'cows/aussie_red3.jpeg', 'cows/aussie_red4.jpeg'],
    'Belted Galloway': ['cows/belted_galloway.jpeg', 'cows/belted_galloway2.jpg', 
        'cows/belted_galloway3.jpeg', 'cows/belted_galloway4.jpg'],
    'Brown Swiss': ['cows/brown_swiss.jpeg', 'cows/brown_swiss2.jpeg', 
        'cows/brown_swiss3.jpg', 'cows/brown_swiss4.jpeg'],
    'Charolais': ['cows/charolais.jpg', 'cows/charolais2.jpg', 
        'cows/charolais3.jpg', 'cows/charolais4.jpg'],
    'Gelbvieh': ['cows/gelbvieh.jpeg', 'cows/gelbvieh2.jpeg', 
        'cows/gelbvieh3.jpeg', 'cows/gelbvieh4.jpeg'],
    'Hereford': ['cows/hereford.jpg', 'cows/hereford2.jpg', 
        'cows/hereford3.jpg', 'cows/hereford4.jpeg'],
    'Highland': ['cows/highland.jpeg', 'cows/highland2.jpg', 
        'cows/highland3.jpg', 'cows/highland4.jpg'],
    'Jersey': ['cows/jersey.jpeg', 'cows/jersey2.jpeg', 
        'cows/jersey3.jpg', 'cows/jersey4.jpg'],
    'Limousin': ['cows/limousin.jpeg', 'cows/limousin2.jpeg', 
        'cows/limousin3.jpg', 'cows/limousin4.jpeg'],
    'Piedmontese': ['cows/piedmontese.png', 'cows/piedmontese2.jpg', 
        'cows/piedmontese3.jpg', 'cows/piedmontese4.jpg'],
    'Red Angus': ['cows/red_angus.jpeg', 'cows/red_angus2.jpeg', 
        'cows/red_angus3.jpeg', 'cows/red_angus4.jpg'],
    'Shorthorn': ['cows/shorthorn.jpg', 'cows/shorthorn2.jpg', 
        'cows/shorthorn3.jpeg', 'cows/shorthorn4.jpg'],
    'Texas Longhorn': ['cows/texas_longhorn.jpeg', 'cows/texas_longhorn2.jpg', 
        'cows/texas_longhorn3.jpg', 'cows/texas_longhorn4.jpg'],
    'Podolica': ['cows/podolica.jpg', 'cows/podolica2.jpeg', 
        'cows/podolica3.jpeg', 'cows/podolica4.jpg'],
    'Simmental': ['cows/simmental.jpg', 'cows/simmental2.jpg', 
        'cows/simmental3.jpg', 'cows/simmental4.jpg']
};


let currentBreed;
let currentImageIndex = 0; // Index to keep track of the current image
let currentImageArray = []; // Array of images for the current breed
let incorrectGuesses = []; // Array to store incorrect guesses



// Function to set a random breed and change the image
function setRandomBreed() {
    const breeds = Object.keys(cowBreeds);
    currentBreed = breeds[Math.floor(Math.random() * breeds.length)];
    currentImageArray = cowBreeds[currentBreed];
    currentImageIndex = 0; // Reset to the first image
    document.getElementById('cowImage').src = currentImageArray[currentImageIndex];
    document.getElementById('guess').value = ''; // Reset input
    document.getElementById('feedback').textContent = ''; // Clear feedback
    document.getElementById('incorrectGuesses').innerHTML = ''; // Clear previous incorrect guesses
    incorrectGuesses = []; // Reset the array
}


// Function to show the next image in the gallery
function showNextImage() {
    if (currentImageIndex < currentImageArray.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Loop back to the first image
    }
    document.getElementById('cowImage').src = currentImageArray[currentImageIndex];
}

// Function to show the previous image in the gallery
function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = currentImageArray.length - 1; // Go to the last image
    }
    document.getElementById('cowImage').src = currentImageArray[currentImageIndex];
}

// Function to check the user's guess
let numberOfGuesses = 0; // Variable to track the number of guesses

function checkAnswer() {
    const userGuess = document.getElementById('guess').value.trim();
    const feedback = document.getElementById('feedback');

    numberOfGuesses++; // Increment the guess counter

    if (userGuess.toLowerCase() === currentBreed.toLowerCase()) {
        feedback.textContent = '';
        const message = `Correct! You got this Cowdle in ${numberOfGuesses} guesses!`;
        showPopup(message, "rgba(0, 255, 0, 0.8)"); // Show green popup
        setTimeout(() => {
            numberOfGuesses = 0; // Reset guess counter after showing the popup
            setRandomBreed(); // Load new breed after 2 seconds
        }, 2000); // 2 seconds delay before the next breed
    } else {
        feedback.textContent = 'Try again!';
        feedback.style.color = 'red';

        if (!incorrectGuesses.includes(userGuess.toLowerCase())) {
            incorrectGuesses.push(userGuess.toLowerCase());

            const incorrectGuessesContainer = document.getElementById('incorrectGuesses');
            const guessItem = document.createElement('div');
            guessItem.textContent = userGuess;
            guessItem.classList.add('incorrect-guesses-item');
            guessItem.style.color = 'red';

            incorrectGuessesContainer.appendChild(guessItem);
        }
    }
}


function showPopup(message, backgroundColor) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.style.backgroundColor = backgroundColor;

    // Show the popup and trigger the animation
    popup.style.display = 'block';
    popup.classList.add('show');

    // Remove the animation class after it completes so it can be reused
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // Matches the animation duration
}

// Function to reveal the first letter of the current breed as a hint
document.getElementById('hintButton').addEventListener('click', function() {
    const firstLetter = currentBreed.charAt(0).toUpperCase();
    const guessInput = document.getElementById('guess');

    // If the input field is empty, set the first letter as its value
    if (guessInput.value === '') {
        guessInput.value = firstLetter;
        guessInput.setAttribute('readonly', true); // Make it read-only to prevent the first letter from being erased

        // Use a setTimeout to wait for the event loop to complete and then remove readonly
        setTimeout(() => {
            guessInput.removeAttribute('readonly');
        }, 10);
    }
});

// Function to prevent backspace on the hinted letter
document.getElementById('guess').addEventListener('input', function() {
    const guessInput = document.getElementById('guess');
    const firstLetter = currentBreed.charAt(0).toUpperCase();

    // If the user tries to delete the first letter, prevent it
    if (guessInput.value.charAt(0) !== firstLetter) {
        guessInput.value = firstLetter + guessInput.value.substring(1);
    }
});



// Add an event listener to the input field to trigger the "submit" button on Enter key press
document.getElementById('guess').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Function to display suggestions as the user types
function showSuggestions() {
    const input = document.getElementById('guess').value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (input.length > 0) {
        const matchingBreeds = Object.keys(cowBreeds).filter(breed =>
            breed.toLowerCase().includes(input)
        );

        if (matchingBreeds.length > 0) {
            suggestions.style.display = 'block';
            matchingBreeds.forEach(breed => {
                const div = document.createElement('div');
                div.textContent = breed;
                div.classList.add('suggestion-item');
                div.onclick = function() {
                    document.getElementById('guess').value = breed;
                    suggestions.style.display = 'none';
                };
                suggestions.appendChild(div);
            });
        } else {
            suggestions.style.display = 'none';
        }
    } else {
        suggestions.style.display = 'none';
    }
}

// Add an event listener to the input field to show suggestions while typing
document.getElementById('guess').addEventListener('input', showSuggestions);

// Add event listeners for the navigation buttons
document.getElementById('nextImage').addEventListener('click', showNextImage);
document.getElementById('prevImage').addEventListener('click', showPrevImage);

// Initial image set when the page loads
setRandomBreed();

// Show the information popup
document.getElementById("infoButton").addEventListener("click", function () {
    document.getElementById("infoPopup").style.display = "block";
});

// Close the information popup
document.getElementById("closeInfo").addEventListener("click", function () {
    document.getElementById("infoPopup").style.display = "none";
});

// Optional: Close the popup when clicking outside of it
window.addEventListener("click", function (event) {
    const infoPopup = document.getElementById("infoPopup");
    if (event.target === infoPopup) {
        infoPopup.style.display = "none";
    }
});





