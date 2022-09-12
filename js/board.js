import { Chess } from "../node_modules/chess.js/chess.js"

// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js

var board = null
var game = new Chess()

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}

function makeRandomMove() {
  var possibleMoves = game.moves()

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())
}

function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  // make random legal move for black
  window.setTimeout(makeRandomMove, 250)
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}

function evaluation(colorToEvaluate) {
  const piecesList = Object.entries(game.board())
  console.log(piecesList)
  let summ = 0
  piecesList.forEach((element) => {
    console.log('rentré dans la premiere loop')
    element[1].forEach((item) => {
      if (item == null) return
      if (item.color === colorToEvaluate.data.color) {
        console.log(item)
        console.log("Rentré encore ici")
        console.log(summ)
        switch (item.type) {
          case "p":
            console.log('pion')
            summ += 10
            break
          case "n":
            console.log('cheval')
            summ += 30
            break
          case "b":
            console.log('fou')
            summ += 30
            break
          case "r":
            console.log('tour')
            summ += 50
            break
          case "q":
            console.log('reine')
            summ += 90
            break
          case "k":
            console.log('roi')
            summ += 900
            break
        }
        console.log(summ)
      } 
    })
  })
  console.log("la somme des pièces est:", summ)
}

function goingBack() {
  game.move(game.undo())
  console.log(game.undo())
  board.position(game.fen())
}

function minMax() {
  return
}

board = Chessboard('board2', config)

$('#startBtn').on('click', game.reset)
$('#startBtn').on('click', board.start)
$('#eval').on('click', { color: "b" }, evaluation)
$('#Undo').on('click', goingBack)