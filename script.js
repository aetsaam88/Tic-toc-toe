const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains("taken")) return;

  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    message.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

restartBtn.addEventListener("click", startGame);

startGame();
