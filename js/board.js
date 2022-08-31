function loadScript(url) {    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

loadScript('/js/jquery-1.7.min.js');
loadScript('/js/startGame')

import {startGame2} from './startGame.js'

var board = Chessboard('board2', {
    draggable: true,    
    dropOffBoard: 'trash',
    sparePieces: true
})


$('#startBtn').on('click', startGame2.startGame(board))
$('#clearBtn').on('click', board.clear)