const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill("");

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
    board.innerHTML = "";
    gameState.forEach((cell, index) => {
        const div = document.createElement('div');
        div.className = `cell ${cell ? 'taken' : ''}`;
        div.textContent = cell;
        div.addEventListener('click', () => handleMove(index));
        board.appendChild(div);
    });
}

function handleMove(index) {
    if (gameState[index] === "") {
        gameState[index] = currentPlayer;
        if (checkWin()) {
            statusDisplay.textContent = `${currentPlayer} wins!`;
        } else if (!gameState.includes("")) {
            statusDisplay.textContent = `It's a tie!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
        renderBoard();
    }
}

function checkWin() {
    return winningConditions.some(condition => 
        condition.every(index => gameState[index] === currentPlayer)
    );
}

resetButton.addEventListener('click', () => {
    gameState = Array(9).fill("");
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
});

statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
renderBoard();
