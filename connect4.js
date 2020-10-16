/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;
let turn = 0;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
const htmlBoard = document.querySelector("#board");

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push([]);
    for (let j = 0; j < WIDTH; j++) {
      board[i].push([]);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick); //handleClick is func to add piece

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); //setting id's for top row
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (var y = 0; y < HEIGHT; y++) {
    //creating rows and columns for pieces
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); //giving each cell a corresponding id to its matrix position
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let check = 5;
  while (check >= 0) {
    if (board[check][x].length === 0) {
      return check;
    } else {
      check -= 1;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  const place = document.getElementById(`${y}-${x}`);
  console.log();
  if (currPlayer == 1) {
    piece.classList.add("p1", "piece");
  } else {
    piece.classList.add("p2", "piece");
  }
  place.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(function () {
    alert(msg);
  }, 20);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  turn += 1;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    turn -= 1;
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  //update current player

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every((row) => row.every((cell) => cell.length > 0))) {
    endGame("All spots filled. The game is a tie!");
  }

  if (turn === 42) {
    endGame("All spots filled. The game is a tie!");
  }
  // switch players
  currPlayer == 1 ? (currPlayer = 2) : (currPlayer = 1);
  let player = document.getElementById("curPlay");
  player.innerText = `Current Player: ${currPlayer}`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    //starting at top left and going down
    for (var x = 0; x < WIDTH; x++) {
      //starting at top left and going right
      var horiz = [
        [y, x], //checking for horizontal 4 same
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        ///vert 4 same
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        //diag down right 4 same
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
        //diag down left 4 same
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
