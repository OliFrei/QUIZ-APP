const questions = [
    {
        question: "Which microphone type has a coil around a magnet to generate voltage?",
        answers: [
            {text: "Condenser", correct: false},
            {text: "Dynamic", correct: true},
            {text: "Ribbon", correct: false},
            {text: "Tube", correct: false},
        ]
    },
    {
        question: "Which of the following characteristic is NOT part of a sound wave?",
        answers: [
            {text: "Amplitude", correct: false},
            {text: "Length", correct: false},
            {text: "Frequency", correct: false},
            {text: "Voltage", correct: true},
        ]
    },
    {
        question: "What pickup pattern is commonly used to completely reject the sides?",
        answers: [
            {text: "Omni", correct: false},
            {text: "Cardioid", correct: false},
            {text: "Figure-8", correct: true},
            {text: "Shotgun", correct: false},
        ]
    },
    {
        question: "Which cable connection do most microphones use?",
        answers: [
            {text: "XLR", correct: true},
            {text: "TRS", correct: false},
            {text: "MIDI", correct: false},
            {text: "HDMI", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion() {
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();