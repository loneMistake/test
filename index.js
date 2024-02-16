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
];

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

const elements = {
  windowTitle: document.querySelector(".window__title"),
  windowStart: document.querySelector(".window__start"),
  quizContainer: document.querySelector(".quiz-container"),
  questionElement: document.querySelector(".question"),
  optionsElement: document.querySelector(".options"),
  resultElement: document.querySelector(".result"),
  nextButton: document.querySelector(".next-btn"),
  restartButton: document.querySelector(".restart-btn"),
  timerElement: document.querySelector(".timer"),
  progressBar: document.querySelector('.progress-bar')
};

const startQuizWithArray = (questionArray) => {
  quizData = questionArray;
  startQuiz();
};

const startQuiz = () => {
  hideElements(elements.windowTitle, elements.windowStart);
  elements.quizContainer.style.display = "block";
  loadQuestion();
  startTimer();
};

const loadQuestion = () => {
  resetTimer();
  const currentQuizData = quizData[currentQuestion];
  elements.questionElement.textContent = `${currentQuestion + 1}/${quizData.length}. ${currentQuizData.question}`;
  elements.optionsElement.innerHTML = "";
  currentQuizData.options.forEach(option => {
      const optionElement = document.createElement("div");
      optionElement.textContent = option;
      optionElement.classList.add("option");
      optionElement.addEventListener("click", () => checkAnswer(option));
      elements.optionsElement.appendChild(optionElement);
  });
  hideElements(elements.nextButton, elements.restartButton);
};

const checkAnswer = (answer) => {
  clearInterval(timer);
  const currentQuizData = quizData[currentQuestion];
  if (answer === currentQuizData.correctAnswer) {
      score++;
  }
  showElement(elements.nextButton);
  disableOptions();
  highlightCorrectAnswer();
};

const highlightCorrectAnswer = () => {
  const currentQuizData = quizData[currentQuestion];
  const options = elements.optionsElement.querySelectorAll(".option");
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
      elements.resultElement.textContent = "";
      hideElements(elements.nextButton, elements.restartButton);
      enableOptions();
      startTimer();
      updateProgressBar(currentQuestion, quizData.length);
  } else {
      endQuiz();
  }
};

const endQuiz = () => {
  clearInterval(timer);
  elements.questionElement.textContent = `You've completed the quiz! Your score is ${score}/${quizData.length}.`;
  elements.optionsElement.innerHTML = "";
  elements.resultElement.textContent = "";
  hideElements(elements.nextButton);
  showElement(elements.restartButton);
  updateProgressBar(currentQuestion, quizData.length);
  hideElement(elements.progressBar);
  hideElement(elements.timerElement);
};

const restartQuiz = () => {
  currentQuestion = 0;
  score = 0;
  showElement(elements.windowTitle);
  showElement(elements.timerElement);
  showElement(elements.progressBar);
  showElement(elements.windowStart);
  hideElement(elements.quizContainer);
  elements.questionElement.textContent = "";
  elements.optionsElement.innerHTML = "";
  elements.resultElement.textContent = "";
  hideElement(elements.nextButton);
  hideElement(elements.restartButton);
  resetTimer();
  updateProgressBar(currentQuestion, quizData.length);
};

const startTimer = () => {
  let time = 60;
  elements.timerElement.textContent = `Time : ${time} sec`;
  timer = setInterval(() => {
      time--;
      elements.timerElement.textContent = `Time : ${time} sec`;
      if (time === 0) {
          clearInterval(timer);
          elements.optionsElement.innerHTML = "";
          elements.resultElement.textContent = "";
          hideElements(elements.nextButton);
          showElement(elements.restartButton);
          hideElement(elements.progressBar);
          hideElement(elements.timerElement);
          elements.questionElement.textContent = `You failed the test, try again!`;
      }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(timer);
  elements.timerElement.textContent = "";
};

const disableOptions = () => {
  elements.optionsElement.querySelectorAll(".option").forEach(option => {
      option.style.pointerEvents = "none";
  });
};

const enableOptions = () => {
  elements.optionsElement.querySelectorAll(".option").forEach(option => {
      option.style.pointerEvents = "auto";
      option.style.backgroundColor = "";
  });
};

const updateProgressBar = (current, total) => {
  const progress = (current / total) * 100;
  elements.progressBar.style.width = `${progress}%`;
};

const hideElement = (element) => {
  element.style.display = "none";
};

const showElement = (element) => {
  element.style.display = "block";
};

const hideElements = (...elements) => {
  elements.forEach(element => {
      hideElement(element);
  });
};

const showElements = (...elements) => {
  elements.forEach(element => {
      showElement(element);
  });
};
const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const toggleTheme = () => {
  const rootElement = document.documentElement;
  rootElement.classList.toggle("dark-theme");
  rootElement.classList.toggle("light-theme");
  const currentTheme = rootElement.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
  themeToggleButton.textContent = themeToggleButton.textContent === "Dark Mode" ? "Light Mode" : "Dark Mode";
};

const themeToggleButton = document.querySelector(".theme-toggle-button");
themeToggleButton.addEventListener("click", toggleTheme);

const initializeApp = () => {
  const currentTheme = localStorage.getItem("theme");
  document.documentElement.classList.add(currentTheme === "dark" ? "dark-theme" : "light-theme");
};

initializeApp();
loadQuestion();
