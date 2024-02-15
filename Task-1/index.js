let quizData = [
  {
      question: "What is the tallest mountain peak in the world?",
      options: ["Mount Everest", "Kilimanjaro", "Mount McKinley", "Aconcagua"],
      correctAnswer: "Mount Everest"
  },
  {
      question: "Who wrote the novel 'Crime and Punishment'?",
      options: ["Leo Tolstoy", "Fyodor Dostoevsky", "Alexander Pushkin", "Ivan Turgenev"],
      correctAnswer: "Fyodor Dostoevsky"
  },
  {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Shanghai", "Tokyo", "Seoul"],
      correctAnswer: "Tokyo"
  },
  {
      question: "Which planet is the largest in the Solar System?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter"
  },
  {
      question: "What is the longest river in the world?",
      options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      correctAnswer: "Nile"
  }
]

let mediumQuizData = [
    {
      question: "Who painted the 'Mona Lisa'?",
      options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "What is the largest country in the world by land area?",
      options: ["Russia", "Canada", "China", "United States"],
      correctAnswer: "Russia"
    },
    {
      question: "What is the capital city of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: "Canberra"
    },
    {
      question: "Who wrote the novel 'Pride and Prejudice'?",
      options: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "Virginia Woolf"],
      correctAnswer: "Jane Austen"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Hg"],
      correctAnswer: "Au"
    }
  ];

let hardQuizData = [
    {
      question: "What is the chemical formula for photosynthesis?",
      options: ["CO2 + H2O → C6H12O6 + O2", "H2O + O2 → CO2 + H2O", "NH3 + O2 → HNO3 + H2O", "N2 + 3H2 → 2NH3"],
      correctAnswer: "CO2 + H2O → C6H12O6 + O2"
    },
    {
      question: "Who is the author of the novel 'War and Peace'?",
      options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Mikhail Bulgakov"],
      correctAnswer: "Leo Tolstoy"
    },
    {
      question: "What is the capital city of Brazil?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
      correctAnswer: "Brasília"
    },
    {
      question: "Who discovered the theory of general relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
      correctAnswer: "Albert Einstein"
    },
    {
      question: "What is the chemical symbol for silver?",
      options: ["Au", "Ag", "Fe", "Hg"],
      correctAnswer: "Ag"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;

const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const resultElement = document.querySelector(".result");
const nextButton = document.querySelector(".next-btn");
const restartButton = document.querySelector(".restart-btn");
const timerElement = document.querySelector(".timer");
const progressBar = document.querySelector('.progress-bar');

const startQuizWithArray = (questionArray) => {
  quizData = questionArray;
  startQuiz();
};

const startQuiz = () => {
  document.querySelectorAll('.window__title, .window__start').forEach(e => {
    e.style.display = 'none';
  });
  document.querySelector('.quiz-container').style.display = 'block';
  loadQuestion();
  startTimer();
};

const loadQuestion = () => {
  resetTimer();
  const currentQuizData = quizData[currentQuestion];
  questionElement.textContent = `${currentQuestion + 1}/${quizData.length}. ${currentQuizData.question}`;
  optionsElement.innerHTML = "";
  currentQuizData.options.forEach(option => {
    const optionElement = document.createElement("div");
    optionElement.textContent = option;
    optionElement.classList.add("option");
    optionElement.addEventListener("click", () => checkAnswer(option));
    optionsElement.appendChild(optionElement);
  });
  nextButton.style.display = "none";
  restartButton.style.display = "none";
};

const checkAnswer = (answer) => {
  clearInterval(timer);
  const currentQuizData = quizData[currentQuestion];
  if (answer === currentQuizData.correctAnswer) {
    score++;
  }
  nextButton.style.display = "block";
  disableOptions();
  highlightCorrectAnswer();
};

const highlightCorrectAnswer = () => {
  const currentQuizData = quizData[currentQuestion];
  const options = optionsElement.querySelectorAll(".option");
  options.forEach(option => {
    if (option.textContent === currentQuizData.correctAnswer) {
      option.style.backgroundColor = "lightgreen";
    } else {
      option.style.backgroundColor = "lightcoral";
    }
  });
};

const nextQuestion = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    resultElement.textContent = "";
    nextButton.style.display = "none";
    enableOptions();
    startTimer();
    updateProgressBar(currentQuestion, quizData.length);
  } else {
    endQuiz();
  }
};

const endQuiz = () => {
  clearInterval(timer);
  questionElement.textContent = `You've completed the quiz! Your score is ${score}/${quizData.length}.`;
  optionsElement.innerHTML = "";
  resultElement.textContent = "";
  nextButton.style.display = "none";
  restartButton.style.display = "block";
  updateProgressBar(currentQuestion, quizData.length);
  progressBar.style.display = "none";
  timerElement.style.display = "none";
};

const restartQuiz = () => {
  currentQuestion = 0;
  score = 0;
  document.querySelectorAll('.window__title, .window__start').forEach(e => {
    e.style.display = 'block';
  });
  document.querySelector('.quiz-container').style.display = 'none';
  document.querySelector('.timer').style.display = 'block';
  document.querySelector('.progress-bar').style.display = 'block';
};

const startTimer = () => {
  let time = 60;
  timerElement.textContent = `Time : ${time} sec`;
  timer = setInterval(() => {
    time--;
    timerElement.textContent = `Time : ${time} sec`;
    if (time === 0) {
      clearInterval(timer);
      optionsElement.innerHTML = "";
      resultElement.textContent = "";
      nextButton.style.display = "none";
      restartButton.style.display = "block";
      progressBar.style.display = "none";
      timerElement.style.display = "none";
      questionElement.textContent = `you failed the test, try again!`;
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(timer);
  timerElement.textContent = "";
};

const disableOptions = () => {
  document.querySelectorAll(".option").forEach(option => {
    option.style.pointerEvents = "none";
    option.style.backgroundColor = "";
  });
};

const enableOptions = () => {
  document.querySelectorAll(".option").forEach(option => {
    option.style.pointerEvents = "auto";
  });
};

loadQuestion()
updateProgressBar(currentQuestion, quizData.length);

const setTheme = (theme) => {
  const rootElement = document.documentElement;
  rootElement.setAttribute("data-theme", theme);
}

const toggleTheme = () => {
  const rootElement = document.documentElement;
  rootElement.classList.toggle("dark-theme");
  rootElement.classList.toggle("light-theme");
  const currentTheme = rootElement.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
  const buttonLabel = themeToggleButton.textContent;
  themeToggleButton.textContent = buttonLabel === "Dark Mode" ? "Light Mode" : "Dark Mode";
};

const themeToggleButton = document.querySelector(".theme-toggle-button");
themeToggleButton.addEventListener("click", toggleTheme);

const initializeApp = () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark-theme");
  } else {
    document.documentElement.classList.add("light-theme");
  }
}

function updateProgressBar(currentValue, maxValue) {
  const progress = (currentValue / maxValue) * 100;
  progressBar.value = progress;
}

initializeApp();