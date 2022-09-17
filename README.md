# chessAI
The inital goal was to create an AI that could play chess. Thus I had to find a way to create a chess game. I started creating [my own chess engine](https://github.com/LuckasRakoto/chessEngine).
After a while it would take way to much time to implement every pieces with every sneaky rules chess offers (e.g. en passant). Therefore, I swapped to js and used [chessjs](https://github.com/jhlywa/chess.js/blob/master/README.md) 
as a chess engine and used [chessboardjs](https://chessboardjs.com/) to render the game to which I implemented the minmax algorithm. 

# issues and improvements
The main issue is that the AI basically plays random moves in the early game due to the nature of the algorithm. It cannot forsee more than three moves ahead and it evaluates the value of the move by evaluating the difference between the value of
black and white pieces on the board. An major improvement that could be made is adding value to a piece depending on its position (e.g. a knight in the middle is not worth the same as a knight that hasnt moved yet).
Another improvement possible is adding alpha-beta pruning.
