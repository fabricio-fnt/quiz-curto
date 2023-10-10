const quizData = [
    {
        question: "Qual é a capital da França?",
        options: ["Paris", "Londres", "Berlim", "Madri"],
        answer: "Paris"
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Vênus", "Marte", "Júpiter", "Terra"],
        answer: "Júpiter"
    },
    {
    question: "Quantos lados tem um triangulo?",
    options: ["1", "3", "6", "4"],
    answer: "3"
    },
    
];

const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const resultElement = document.querySelector(".result");
const nextButton = document.querySelector(".next");
const timerElement = document.getElementById("timer"); // Elemento para exibir o temporizador
let currentQuestion = 0;
let score = 0;
let timeLeft = 10; // Tempo inicial em segundos

function startTimer() {
    const timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = "Tempo Esgotado! Perdeu!";
            optionsElement.querySelectorAll(".option").forEach(button => {
                button.disabled = true; // Desabilita as opções após o tempo esgotar
            });
            nextButton.style.display = "block";
            nextButton.addEventListener("click", nextQuestion);
        } else {
            timerElement.textContent = `Tempo Restante: ${timeLeft} segundos`;
            timeLeft--;
        }
    }, 1000); // Atualiza a cada 1 segundo (1000 milissegundos)
}

function loadQuestion() {
    timeLeft = 10; // Reinicie o temporizador a cada nova pergunta
    startTimer(); // Inicia o temporizador
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;

    optionsElement.innerHTML = "";
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(userAnswer) {
    const correctAnswer = quizData[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        score++;
        resultElement.textContent = "Resposta correta!";
    } else {
        resultElement.textContent = "Resposta incorreta. A resposta correta é: " + correctAnswer;
    }

    // Desabilita os botões de opção após uma resposta
    optionsElement.querySelectorAll(".option").forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.addEventListener("click", nextQuestion);
}

function nextQuestion() {
    currentQuestion++;
    resultElement.textContent = "";

    if (currentQuestion < quizData.length) {
        loadQuestion();
        nextButton.style.display = "none";
    } else {
        questionElement.textContent = "Pontuação Final: " + score + " de " + quizData.length;
        optionsElement.innerHTML = "";
        nextButton.style.display = "none";
        timerElement.textContent = ""; // Limpa o temporizador na pontuação final
    }
}

// Inicializa o quiz carregando a primeira pergunta
loadQuestion();