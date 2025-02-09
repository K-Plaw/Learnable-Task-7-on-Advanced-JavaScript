const quizData = [
    {
        question: "Which HTML tag is used to create a paragraph?",
        options: ["<p>", "<para>", "<paragraph>", "<text>"],
        answer: "<p>"
    },
    {
        question: "What is the correct way to include an external CSS file in HTML?",
        options: [
            "<style src='styles.css'>",
            "<link rel='stylesheet' href='styles.css'>",
            "<css>styles.css</css>",
            "<script src='styles.css'>"
        ],
        answer: "<link rel='stylesheet' href='styles.css'>"
    },
    {
        question: "Which CSS property is used to change the font size of text?",
        options: ["text-size", "font-size", "size", "font-style"],
        answer: "font-size"
    },
    {
        question: "What is the correct way to write a JavaScript function?",
        options: [
            "function = myFunction() {}",
            "function myFunction() {}",
            "myFunction() = function {}",
            "function: myFunction() {}"
        ],
        answer: "function myFunction() {}"
    },
    {
        question: "Which HTML tag is used to create a numbered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ol>"
    },
    {
        question: "Which CSS property is used to add space inside an element?",
        options: ["margin", "padding", "spacing", "border"],
        answer: "padding"
    },
    {
        question: "What is the correct way to write a comment in HTML?",
        options: [
            "<!-- This is a comment -->",
            "// This is a comment",
            "/* This is a comment */",
            "# This is a comment"
        ],
        answer: "<!-- This is a comment -->"
    },
    {
        question: "Which JavaScript method is used to write content into an HTML element?",
        options: ["document.write()", "element.innerHTML", "console.log()", "window.alert()"],
        answer: "element.innerHTML"
    },
    {
        question: "Which HTML tag is used to create a button?",
        options: ["<btn>", "<button>", "<input type='button'>", "<click>"],
        answer: "<button>"
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: ["text-weight", "font-weight", "bold", "font-style"],
        answer: "font-weight"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");
const progressText = document.getElementById("progress");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");

// For Question shuffle
quizData.sort(() => Math.random() - 0.5);

// For option shuffle (cheating minimized)
function shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
}

// Function to escape HTML special characters
function escapeHTML(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Function to load a question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    // Ensure options are shuffled without changing the original array
    const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);

    // Generates the question and options
    quizContainer.innerHTML = `
        <h2>${escapeHTML(currentQuestion.question)}</h2>
        <div id="options-container">
            ${shuffledOptions.map(option => 
                `<button class="option-btn">${escapeHTML(option)}</button>`
            ).join("")}
        </div>
    `;

    // Attach event listeners to options
    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    });

    nextButton.classList.add("hidden");
}

// Function to handle answer selection
function selectAnswer(selectedButton, correctAnswer) {
    const selectedAnswer = selectedButton.textContent;

    // Disable all buttons after selection
    document.querySelectorAll(".option-btn").forEach(button => {
        button.disabled = true;

        // Highlight the correct answer in green
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    // Show the Next button
    nextButton.classList.remove("hidden");
}

// Function to show final result
function showResult() {
    quizContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    let feedback = "";
    if (score === quizData.length) {
        feedback = "🎉 Excellent! You got a perfect score!";
    } else if (score > quizData.length / 2) {
        feedback = "👍 Well done! Keep improving.";
    } else {
        feedback = "😕 Keep practicing! You'll get better.";
    }

    resultContainer.innerHTML = `<h2>You scored ${score} out of ${quizData.length}!</h2><p>${feedback}</p>`;
    restartButton.classList.remove("hidden");
}

// Function to restart the quiz
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    quizData.sort(() => Math.random() - 0.5); // Reshuffle questions
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    restartButton.classList.add("hidden");

    progressText.textContent = ""; // Reset progress text
    quizContainer.innerHTML = ""; // Clear previous questions
    loadQuestion();
});

// Function to handle Next button click
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

//Function to make N for next question and Previous functions
// document.addEventListener("keydown", function(event) {
//    if (event.key === "n" || event.key === "N") { 
//        nextButton.click();  // Simulate clicking the Next button
  //  } else if (event.key === "p" || event.key === "P") {
    //    goToPreviousQuestion(); // Call function to go back
//    }
// });

// Function to go to the previous question
//function goToPreviousQuestion() {
//    if (currentQuestionIndex > 0) {  // Ensure we don't go before the first question
  //      currentQuestionIndex--;  // Move one step back
    //    loadQuestion();  // Reload the previous question
    //}
//}


// Start the quiz when the Start button is clicked
startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
});
