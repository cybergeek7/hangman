const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popupContainer = document.getElementById('popup-container');
const notificationContainer = document.getElementById('notification-container');
const finalMessageEl = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Split method turns a string into an array
// Join method turns an array into a string

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `<span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </span>`
      )
      .join('')}  
  `;

  // Check if won
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessageEl.innerText = 'Congratulations! You Won! 😃';
    popupContainer.style.display = 'flex';
  }
}

// Update the wrong letters and figure
function updateUI() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  // Display figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessageEl.innerText = 'Unfortunately You Lost. 🙁';
    popupContainer.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notificationContainer.classList.add('show');

  setTimeout(() => {
    notificationContainer.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', (e) => {
  // console.log(e.keyCode);
  // Letters range (65-90)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateUI();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // Empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Assign a new random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Update UI elements and show the new hidden word
  updateUI();
  displayWord();

  // Hide the popup
  popupContainer.style.display = 'none';
});

displayWord();
