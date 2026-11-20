const QUESTIONS_PER_GAME = 10;
const TIME_PER_QUESTION = 20;   // seconds
const MAX_POINTS = 1000;        // for an instant correct answer
const STREAK_BONUS = 100;       // extra points per answer in a row, from the 2nd onward
const MAX_STREAK_BONUS = 500;

const questionEl = document.querySelector('#question');
const animeTagEl = document.querySelector('#anime-tag');
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const scoreText = document.querySelector('#score');
const streakText = document.querySelector('#streak');
const timerText = document.querySelector('#timer');
const timerBar = document.querySelector('#timerBarFull');
const choiceButtons = Array.from(document.querySelectorAll('.choice'));
const feedbackEl = document.querySelector('#feedback');
const feedbackTitle = document.querySelector('#feedback-title');
const feedbackDetail = document.querySelector('#feedback-detail');
const nextBtn = document.querySelector('#next-btn');

let gameQuestions = [];
let currentIndex = -1;
let currentQuestion = null;
let acceptingAnswers = false;
let score = 0;
let streak = 0;
let correctCount = 0;
let questionStart = 0;
let timerId = null;

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function startGame() {
    gameQuestions = shuffle(QUESTION_BANK).slice(0, QUESTIONS_PER_GAME);
    currentIndex = -1;
    score = 0;
    streak = 0;
    correctCount = 0;
    clearLastResult();
    updateHud();
    nextQuestion();
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= gameQuestions.length) {
        endGame();
        return;
    }

    currentQuestion = gameQuestions[currentIndex];
    const total = gameQuestions.length;

    progressText.textContent = `Question ${currentIndex + 1} of ${total}`;
    progressBarFull.style.width = `${((currentIndex + 1) / total) * 100}%`;
    animeTagEl.textContent = currentQuestion.anime;
    questionEl.textContent = currentQuestion.question;

    choiceButtons.forEach((btn, i) => {
        btn.querySelector('.choice-text').textContent = currentQuestion.choices[i];
        btn.classList.remove('correct', 'incorrect', 'dimmed', 'selected');
        btn.disabled = false;
    });

    feedbackEl.hidden = true;
    feedbackEl.className = 'feedback';
    acceptingAnswers = true;
    startTimer();
}

function startTimer() {
    clearInterval(timerId);
    questionStart = performance.now();
    renderTimer(TIME_PER_QUESTION);
    timerId = setInterval(() => {
        const elapsed = (performance.now() - questionStart) / 1000;
        const remaining = Math.max(0, TIME_PER_QUESTION - elapsed);
        renderTimer(remaining);
        if (remaining <= 0) {
            handleAnswer(null);
        }
    }, 100);
}

function renderTimer(remaining) {
    timerText.textContent = Math.ceil(remaining);
    timerBar.style.width = `${(remaining / TIME_PER_QUESTION) * 100}%`;
    timerBar.classList.toggle('low', remaining <= 5);
}

// Faster correct answers earn more: from 1000 points (instant) down to 500 (last second).
function pointsFor(elapsedSeconds) {
    const fraction = Math.min(elapsedSeconds / TIME_PER_QUESTION, 1);
    return Math.round(MAX_POINTS * (1 - fraction / 2));
}

function handleAnswer(choiceIndex) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    clearInterval(timerId);

    const elapsed = (performance.now() - questionStart) / 1000;
    const isCorrect = choiceIndex === currentQuestion.answer;

    choiceButtons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === currentQuestion.answer) {
            btn.classList.add('correct');
        } else if (i === choiceIndex) {
            btn.classList.add('incorrect', 'selected');
        } else {
            btn.classList.add('dimmed');
        }
    });

    let gained = 0;
    if (isCorrect) {
        streak++;
        correctCount++;
        const bonus = Math.min((streak - 1) * STREAK_BONUS, MAX_STREAK_BONUS);
        gained = pointsFor(elapsed) + bonus;
        score += gained;
        feedbackTitle.textContent = 'Correct!';
        feedbackDetail.textContent = bonus > 0
            ? `+${gained} points (includes +${bonus} for a ${streak}-answer streak)`
            : `+${gained} points`;
        feedbackEl.classList.add('is-correct');
    } else {
        streak = 0;
        feedbackTitle.textContent = choiceIndex === null ? 'Time\'s up!' : 'Incorrect';
        feedbackDetail.textContent = `The answer was ${currentQuestion.choices[currentQuestion.answer]}`;
        feedbackEl.classList.add('is-incorrect');
    }

    updateHud();
    nextBtn.textContent = currentIndex + 1 >= gameQuestions.length ? 'See results' : 'Next question';
    feedbackEl.hidden = false;
    nextBtn.focus();
}

function updateHud() {
    scoreText.textContent = score.toLocaleString();
    streakText.textContent = streak;
}

function endGame() {
    saveLastResult({
        score,
        correct: correctCount,
        total: gameQuestions.length,
        date: Date.now(),
        saved: false,
    });
    window.location.assign('end.html');
}

choiceButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => handleAnswer(i));
});

nextBtn.addEventListener('click', nextQuestion);

// Keyboard: 1-4 to answer, Enter/Space for next.
document.addEventListener('keydown', (e) => {
    if (acceptingAnswers && ['1', '2', '3', '4'].includes(e.key)) {
        handleAnswer(Number(e.key) - 1);
    }
});

startGame();
