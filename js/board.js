var board = Chessboard('board2', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
})

import { startGame2 } from './startGame.js'
//startGame = require('./startGame')

// $('#startBtn').on('click', startGame2.startGame(board))
$('#startBtn').on('click', board.start)
$('#clearBtn').on('click', board.clear)