const podiumEl = document.querySelector('#podium');
const restList = document.querySelector('#rest-list');
const emptyEl = document.querySelector('#empty');
const clearBtn = document.querySelector('#clear-btn');

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text; // textContent keeps names safe from HTML injection
    return node;
}

function render() {
    const scores = getLeaderboard();
    podiumEl.replaceChildren();
    restList.replaceChildren();

    emptyEl.hidden = scores.length > 0;
    podiumEl.hidden = scores.length === 0;
    clearBtn.hidden = scores.length === 0;

    // Podium order on screen: 2nd, 1st, 3rd.
    const medals = ['🥇', '🥈', '🥉'];
    [1, 0, 2].forEach((rank) => {
        const entry = scores[rank];
        if (!entry) return;
        const spot = el('div', `podium-spot place-${rank + 1}`);
        spot.append(
            el('span', 'podium-medal', medals[rank]),
            el('span', 'podium-name', entry.name),
            el('span', 'podium-score', entry.score.toLocaleString()),
        );
        const block = el('div', 'podium-block', String(rank + 1));
        spot.append(block);
        podiumEl.append(spot);
    });

    scores.slice(3).forEach((entry, i) => {
        const li = el('li', 'rest-row');
        li.append(
            el('span', 'rest-rank', String(i + 4)),
            el('span', 'rest-name', entry.name),
            el('span', 'rest-meta', `${entry.correct}/${entry.total}`),
            el('span', 'rest-score', entry.score.toLocaleString()),
        );
        restList.append(li);
    });
}

clearBtn.addEventListener('click', () => {
    if (confirm('Clear all saved scores? This cannot be undone.')) {
        clearLeaderboard();
        render();
    }
});

render();
