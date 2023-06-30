const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currrentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availbleQuestions = {}

let questions = {
{
    question: 'What is 2 + 2?'
    choice1: '2',
    choice2: '4',
    choice3: '6',
    choice4: '8',
    answer: 2,
},
{
    question: 'What is 2 + 2?'
    choice1: '2',
        choice2: '4',
            choice3: '6',
                choice4: '8',
                    answer: 2,
},
{
    question: 'What is 2 + 2?'
    choice1: '2',
        choice2: '4',
            choice3: '6',
                choice4: '8',
                    answer: 2,
},
{
    question: 'What is 2 + 2?'
    choice1: '2',
        choice2: '4',
            choice3: '6',
                choice4: '8',
                    answer: 2,
},
{
    question: 'What is 2 + 2?'
    choice1: '2',
        choice2: '4',
            choice3: '6',
                choice4: '8',
                    answer: 2,
}
}

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availbleQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availbleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    const questionsIndex = Math.floor(Math.random() * availbleQuestions.length)
    currrentQuestion = availbleQuestions[questionsIndex]
    question.innerText = currrentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currrentQuestion['choice' + number]
    })

    availbleQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currrentQuestion.answer ? 'correct' :

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()