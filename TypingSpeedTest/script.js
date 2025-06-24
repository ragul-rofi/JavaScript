const quoteDisplay = document.getElementById("quote");
const inputbox = document.getElementById("input");
const timertext = document.getElementById("timer");
const wpmtext = document.getElementById("wpm");
const accuracytext = document.getElementById("accuracy");
const startBtn = document.getElementById("startbtn");

const sentences = [
    "JavaScript is the language of the web.",
    "Typing fast improves your productivity.",
    "Stay focused and keep practicing daily.",
    "Frontend development needs attention to detail.",
    "Code. Debug. Improve. Repeat."
];

let startTime, interval;
let totaltyped = 0;
let correctTyped = 0;
let timeLimit = 60; 
let currentQuote = ""; 

startBtn.addEventListener("click", startTest);

function startTest() {
    inputbox.value = "";
    inputbox.disabled = false;
    inputbox.focus();
    startBtn.disabled = true;

    
    currentQuote = getRandomQuote();
    
    quoteDisplay.textContent = currentQuote;

    timertext.textContent = `Time: ${timeLimit}s`;
    wpmtext.textContent = `WPM: 0`;
    accuracytext.textContent = `Accuracy: 100%`;

    totaltyped = 0;
    correctTyped = 0;
    startTime = new Date();

    clearInterval(interval); // Clear any existing interval before starting a new one
    interval = setInterval(updateTime, 1000);
}

function getRandomQuote() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function updateTime() {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    const remaining = timeLimit - elapsed;

    timertext.textContent = `Time: ${remaining}s`;

    if (remaining <= 0) {
        endTest();
    }
}

function endTest() {
    clearInterval(interval);
    inputbox.disabled = true;
    startBtn.disabled = false;

    // Reset the quote display to plain text after the test ends
    quoteDisplay.textContent = currentQuote; // Or clear it if you prefer

    const elapsedMinutes = timeLimit / 60;
    const wordsTyped = inputbox.value.trim().split(/\s+/).filter(word => word !== '').length;
    const wpm = Math.round(wordsTyped / elapsedMinutes);
    const accuracy = totaltyped === 0 ? 100 : Math.round((correctTyped / totaltyped) * 100);

    wpmtext.textContent = `WPM: ${wpm}`;
    accuracytext.textContent = `Accuracy: ${accuracy}%`;
}

// Track each key typed and provide visual feedback
inputbox.addEventListener("input", () => {
    // Use the stored currentQuote for comparison
    const expected = currentQuote;
    const typed = inputbox.value;

    totaltyped = typed.length;

    let correct = 0;
    let highlightedText = '';

    for (let i = 0; i < expected.length; i++) {
        let char = expected[i];

        if (i < typed.length) {
            if (typed[i] === expected[i]) {
                char = `<span style="color: green;">${expected[i]}</span>`;
                correct++;
            } else {
                // Only highlight incorrect if the character exists in the typed string
                // And ensure it's not beyond the typed length
                char = `<span style="color: red;">${expected[i]}</span>`;
            }
        }
        highlightedText += char;
    }
    quoteDisplay.innerHTML = highlightedText;

    correctTyped = correct;

    const accuracy = totaltyped === 0 ? 100 : Math.round((correctTyped / totaltyped) * 100);
    accuracytext.textContent = `Accuracy: ${accuracy}%`;

// Optionally, stop the test if the user finishes typing the entire quote
    if (typed.length === expected.length && correctTyped === expected.length) {
        endTest();
    }
});