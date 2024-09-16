const board = document.getElementById('board');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const resetButton = document.getElementById('resetButton');
const resultModal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const closeModal = document.getElementById('closeModal');
let currentPlayer = 'X';
let cells = Array(9).fill('');
let scores = { X: 0, O: 0 };

createBoard();

resetButton.addEventListener('click', resetGame);
closeModal.addEventListener('click', () => {
    resultModal.style.display = 'none';
    resetGame();
});

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        board.appendChild(cell);
    }
}

function makeMove(index) {
    if (cells[index] === '' && !checkWin()) {
        cells[index] = currentPlayer;
        render();
        if (checkWin()) {
            highlightWinningCells();
            setTimeout(() => {
                showResult(`${currentPlayer} wins!`);
                updateScore(currentPlayer);
            }, 1000);
        } else if (cells.every(cell => cell !== '')) {
            setTimeout(() => {
                showResult("It's a draw!");
            }, 500);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function render() {
    board.childNodes.forEach((cell, index) => {
        cell.textContent = cells[index];
        cell.classList.remove('x', 'o');
        if (cells[index] === 'X') cell.classList.add('x');
        if (cells[index] === 'O') cell.classList.add('o');
    });
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function highlightWinningCells() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            board.childNodes[a].classList.add('winning');
            board.childNodes[b].classList.add('winning');
            board.childNodes[c].classList.add('winning');
        }
    });
}

function showResult(message) {
    resultMessage.textContent = message;
    resultModal.style.display = 'flex';
}

function updateScore(winner) {
    scores[winner]++;
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function resetGame() {
    cells = Array(9).fill('');
    currentPlayer = 'X';
    render();
    board.childNodes.forEach(cell => cell.classList.remove('winning'));
    resultModal.style.display = 'none';
}
