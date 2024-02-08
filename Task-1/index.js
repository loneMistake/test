const quizData = [
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
      question: "Who is depicted in the painting 'Mona Lisa'?",
      options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Vincenzo Leonardo"],
      correctAnswer: "Leonardo da Vinci"
  },
  {
      question: "What is the largest ocean on Earth?",
      options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      correctAnswer: "Pacific Ocean"
  },
  {
      question: "In which year did the Titanic sink?",
      options: ["1912", "1907", "1915", "1920"],
      correctAnswer: "1912"
  },
  {
      question: "Who wrote the play 'Hamlet'?",
      options: ["William Shakespeare", "George Bernard Shaw", "Arthur Miller", "Henrik Ibsen"],
      correctAnswer: "William Shakespeare"
  },
  {
      question: "What is the chemical symbol for water?",
      options: ["Wt", "Ox", "H2O", "Wa"],
      correctAnswer: "H2O"
  },
  {
      question: "What is the longest river in the world?",
      options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      correctAnswer: "Nile"
  }
]

let currentQuestion = 0
let score = 0

const questionElement = document.querySelector(".question")
const optionsElement = document.querySelector(".options")
const resultElement = document.querySelector(".result")
const nextButton = document.querySelector(".next-btn")
const restartButton = document.querySelector(".restart-btn")


const startQuiz = () => {
  document.querySelectorAll('.window__title, .window__start').forEach(e => {
      e.style.display = 'none'})
  document.querySelector('.quiz-container').style.display = 'block'
  loadQuestion()
}

const loadQuestion = () => {
  const currentQuizData = quizData[currentQuestion]
  questionElement.textContent = `${currentQuestion + 1}/${quizData.length}. ${currentQuizData.question}`
  optionsElement.innerHTML = ""
  currentQuizData.options.forEach(option => {
      const optionElement = document.createElement("div")
      optionElement.textContent = option
      optionElement.classList.add("option")
      optionElement.addEventListener("click", () => checkAnswer(option))
      optionsElement.appendChild(optionElement)
  });
  nextButton.style.display = "none"
  restartButton.style.display = "none"
}


const checkAnswer = (answer) => {
  const currentQuizData = quizData[currentQuestion]
  if (answer === currentQuizData.correctAnswer) {
      score++;
      resultElement.textContent = "Correct!"
      resultElement.style.color = "green"
  } else {
      resultElement.textContent = "Wrong!"
      resultElement.style.color = "red"
  }
  nextButton.style.display = "block"
  document.querySelectorAll(".option").forEach(option => {
      option.style.pointerEvents = "none"
      if (option.textContent === currentQuizData.correctAnswer) {
          option.style.backgroundColor = "lightgreen"
      } else {
          option.style.backgroundColor = "lightcoral"
      }
  })
}


const nextQuestion = () => {
  currentQuestion++
  if (currentQuestion < quizData.length) {
    loadQuestion()
    resultElement.textContent = ""
    nextButton.style.display = "none"
    document.querySelectorAll(".option").forEach(option => {
      option.style.backgroundColor = ""
      option.style.pointerEvents = "auto"
    })
  } else {
    endQuiz()
  }
}

const endQuiz = () => {
  questionElement.textContent = `You've completed the quiz! Your score is ${score}/${quizData.length}.`
  optionsElement.innerHTML = ""
  resultElement.textContent = ""
  nextButton.style.display = "none"
  restartButton.style.display = "block"
}

const restartQuiz = () => {
  currentQuestion = 0
  score = 0
  loadQuestion()
  restartButton.style.display = "none"
}

loadQuestion()