// Shared helpers for saving scores in the browser.
// Storage can be unavailable (private mode, blocked cookies), so every call is guarded.
const STORAGE_KEYS = {
    leaderboard: 'animeTrivia.leaderboard',
    lastResult: 'animeTrivia.lastResult',
};
const LEADERBOARD_SIZE = 10;

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
        return fallback;
    }
}

function writeJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        return false;
    }
}

function getLeaderboard() {
    const list = readJSON(STORAGE_KEYS.leaderboard, []);
    return Array.isArray(list) ? list : [];
}

// Adds an entry, keeps the top scores, and returns the entry's rank (1-based) or 0 if it didn't place.
function addToLeaderboard(entry) {
    const list = getLeaderboard();
    list.push(entry);
    list.sort((a, b) => b.score - a.score || a.date - b.date);
    const top = list.slice(0, LEADERBOARD_SIZE);
    writeJSON(STORAGE_KEYS.leaderboard, top);
    return top.indexOf(entry) + 1;
}

function qualifiesForLeaderboard(score) {
    const list = getLeaderboard();
    return score > 0 && (list.length < LEADERBOARD_SIZE || score > list[list.length - 1].score);
}

function clearLeaderboard() {
    writeJSON(STORAGE_KEYS.leaderboard, []);
}

function saveLastResult(result) {
    writeJSON(STORAGE_KEYS.lastResult, result);
}

function getLastResult() {
    return readJSON(STORAGE_KEYS.lastResult, null);
}

function clearLastResult() {
    try {
        localStorage.removeItem(STORAGE_KEYS.lastResult);
    } catch (err) { /* ignore */ }
}
