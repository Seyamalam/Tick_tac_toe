const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const modal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
const closeButton = document.querySelector('.close');
const playAgainButton = document.getElementById('playAgain');
let currentPlayer = 'x';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

restartButton.addEventListener('click', restartGame);
playAgainButton.addEventListener('click', restartGame);
closeButton.addEventListener('click', closeModal);

function handleClick(cell) {
  const index = cell.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWinner()) {
    gameActive = false;
    highlightWinningCells(checkWinner());
    showWinMessage(currentPlayer);
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    showWinMessage('Nobody');  // Handle tie
  }
  return null;
}

function highlightWinningCells(winningCells) {
  winningCells.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'x';
  gameActive = true;

  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'winning-cell');
  });

  closeModal();  // Close modal if open
}

function showWinMessage(winner) {
  winMessage.innerText = `${winner.toUpperCase()} wins!`;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}
