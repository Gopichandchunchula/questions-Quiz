const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('right-answers');
const totalQuestionsDisplay = document.getElementById('total-questions'); // Reference to total questions display

let shuffledQuestions, currentQuestionIndex;
let QuizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = Questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    QuizScore = 0;
    scoreDisplay.innerText = QuizScore; // Reset score display at start
    totalQuestionsDisplay.innerText = Questions.length; // Set total questions
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

    if (correct) {
        QuizScore++;
        scoreDisplay.innerText = QuizScore; // Update the score in the score box
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const Questions = [
    {
        question: 'Which one is the JavaScript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false }
        ],
    },
    {
        question: 'Who is the father of Python?',
        answers: [
            { text: 'Charles Babbage', correct: false },
            { text: 'James Gosling', correct: false },
            { text: 'Jordan Walke', correct: false },
            { text: 'Guido van Rossum', correct: true }
        ],
    },
    {
        question: 'What is the full form of DOM?',
        answers: [
            { text: 'Document Objection Medal', correct: false },
            { text: 'Document Object Model', correct: true },
            { text: 'Document Model', correct: false }
        ],
    },
    {
        question: 'Which of these is a JavaScript data type?',
        answers: [
            { text: 'int', correct: false },
            { text: 'float', correct: false },
            { text: 'string', correct: true },
            { text: 'list', correct: false }
        ],
    },
];
