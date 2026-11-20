# Anime Quiz

A Kahoot-style anime trivia game that runs entirely in the browser. No install or server needed.

## How to play
Open `index.html` in a browser and press **Play**.

- 10 questions per game, picked at random from a bank of 20
- 20 seconds per question. Faster correct answers earn more points (up to 1,000)
- Answer correctly in a row for streak bonuses (+100 per streak step, up to +500)
- Click an answer tile or press **1–4** on the keyboard
- Save your name to the top-10 leaderboard at the end (stored in your browser)

## Files
| File | Purpose |
|---|---|
| `index.html` | Home screen |
| `game.html`, `game.js`, `game.css` | The quiz itself: timer, scoring, answer reveal |
| `questions.js` | The question bank. Add or edit questions here |
| `end.html`, `end.js` | Results screen and name entry |
| `leaderboard.html`, `leaderboard.js` | Podium and top-10 list |
| `storage.js` | Saving scores with `localStorage` |
| `style.css` | Shared styles |

## Adding questions
Add an object to `QUESTION_BANK` in `questions.js`:

```js
{
    anime: 'Bleach',
    question: 'What is Ichigo\'s last name?',
    choices: ['Kurosaki', 'Kuchiki', 'Abarai', 'Ishida'],
    answer: 0, // index of the correct choice (0-3)
},
```

## Publishing
The game is all static files, so it works on GitHub Pages: **Settings → Pages → Deploy from branch → main**.
