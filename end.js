const result = getLastResult();

if (!result) {
    // Nobody just finished a game (e.g. the page was opened directly).
    window.location.replace('index.html');
} else {
    const finalScore = document.querySelector('#final-score');
    const correctCount = document.querySelector('#correct-count');
    const accuracy = document.querySelector('#accuracy');
    const message = document.querySelector('#result-message');
    const form = document.querySelector('#save-form');
    const input = document.querySelector('#username');
    const note = document.querySelector('#save-note');

    const pct = Math.round((result.correct / result.total) * 100);
    finalScore.textContent = result.score.toLocaleString();
    correctCount.textContent = `${result.correct}/${result.total}`;
    accuracy.textContent = `${pct}%`;

    if (pct === 100) message.textContent = 'Perfect score! 🏆';
    else if (pct >= 80) message.textContent = 'Anime expert!';
    else if (pct >= 50) message.textContent = 'Nice work!';
    else if (pct > 0) message.textContent = 'Keep watching!';
    else message.textContent = 'Better luck next time!';

    function showNote(text) {
        note.textContent = text;
        note.hidden = false;
    }

    if (result.saved) {
        form.hidden = true;
        showNote('Your score is already saved.');
    } else if (!qualifiesForLeaderboard(result.score)) {
        form.hidden = true;
        showNote(result.score > 0
            ? 'Not quite enough for the top 10 this time. Try again!'
            : 'Score some points to get on the leaderboard.');
    } else {
        input.focus();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = input.value.trim().slice(0, 15);
        if (!name) {
            input.focus();
            return;
        }
        const rank = addToLeaderboard({
            name,
            score: result.score,
            correct: result.correct,
            total: result.total,
            date: result.date,
        });
        result.saved = true;
        saveLastResult(result);
        form.hidden = true;
        showNote(rank > 0 ? `Saved! You're #${rank} on the leaderboard.` : 'Saved!');
    });
}
