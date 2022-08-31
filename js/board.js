function loadScript(url) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
var board = Chessboard('board2', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
})

loadScript('/js/jquery-1.7.min.js');
loadScript('/js/startGame')

import { startGame } from './startGame.js'




$('#startBtn').on('click', startGame(board))
$('#clearBtn').on('click', board.clear)