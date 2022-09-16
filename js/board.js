import { Chess } from "../node_modules/chess.js/chess.js"

var board = null
var game = new Chess()

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}

function makeRandomMove(possibleMoves) {
  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  return possibleMoves[randomIdx]
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

  if (game.turn() === 'b') {
    blackTurn(2)
  }
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
  let summ = 0
  piecesList.forEach((element) => {
    element[1].forEach((item) => {
      if (item == null) return
      if (item.color === colorToEvaluate) {
        switch (item.type) {
          case "p":
            summ += 10
            break
          case "n":
            summ += 30
            break
          case "b":
            summ += 30
            break
          case "r":
            summ += 50
            break
          case "q":
            summ += 90
            break
          case "k":
            summ += 900
            break
        }
      }
    })
  })
  return summ
}

function evaluateBoard(color) {
  if (color === 'w') {
    return (evaluation('w')) - evaluation('b')
  }
  else {
    return (evaluation('b') - evaluation('w'))
  }
}

function goingBack() {
  game.move(game.undo())
  board.position(game.fen())
}

function blackTurn(depth) {
  let iniState = game.fen()
  let bestMove = minMax(depth, true, 'b')[0]
  board.position(iniState)
  game.load(iniState)
  game.move(bestMove)
  board.position(game.fen())
}

function minMax(depth, maximizingPLayer, maximizingColor) {
  let moves = game.moves()
  let bestMove = makeRandomMove(moves)
  if ((depth === 0) || (game.game_over())) {
    return [null, evaluateBoard(maximizingColor)]
  }
  if (maximizingPLayer) { 
    let maxEval = -Infinity
    for (let i = 0; i < moves.length; i++) {
      game.move(moves[i])
      board.position(game.fen())
      let currentEval = minMax(depth - 1, false, maximizingColor)[1]
      goingBack()
      if (currentEval > maxEval) {
        maxEval = currentEval
        bestMove = moves[i]
      }
    }
    return [bestMove, maxEval]
  } else {
    let minEval = Infinity
    for (let i = 0; i < moves.length; i++) {
      game.move(moves[i])
      board.position(game.fen())
      let currentEval = minMax(depth - 1, true, maximizingColor)[1]
      goingBack()
      if (currentEval < minEval) {
        minEval = currentEval
        bestMove = moves[i]
      }
    }
    return [bestMove, minEval]
  }

}

board = Chessboard('board2', config)

function test() {
  console.log('allo')
  console.log(game.moves())
}

$('#startBtn').on('click', game.reset)
$('#startBtn').on('click', board.start)
$('#eval').on('click', { color: "b" }, evaluation)
$('#Undo').on('click', goingBack)
$('#testBtn').on('click', test)