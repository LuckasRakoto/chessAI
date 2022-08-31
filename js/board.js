var board = Chessboard('board2', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
})


$('#startBtn').on('click', board.start)
$('#clearBtn').on('click', board.clear)