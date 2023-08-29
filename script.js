const gameBoard = (() => {
    const board = ['','','','','','','','',''];

    const getBoard = board;

    return {
        getBoard,
    }
})()

function player(name,mark){
    return {name, mark}
}

const game = (() => {
    const cells = document.querySelectorAll('.cell')

    let players= []
    let currentPlayerIndex
    let gameOver

    const start = () => {
        players = [
            player(document.querySelector("#player1").value,"x"),
            player(document.querySelector("#player2").value,"o")
        ]

        currentPlayerIndex = 0;
        gameOver = false;
        game.handleClick()
    }

    const startBtn = document.querySelector(".startBtn")
    startBtn.addEventListener('click', () => {
        game.start()
    })
    
    const playerTurn = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
    }

    let winnerMsg = document.querySelector(".winnerMsg")
    let winnerPara = document.querySelector(".winner.para")
    let tieMsg = document.querySelector(".tieMsg")
    let counterMove = 0

    function cellEvent(e) {
        if(!gameOver){
            if(e.currentTarget.textContent === ""){
            e.currentTarget.textContent = players[currentPlayerIndex].mark;
            gameBoard.getBoard[e.currentTarget.dataset.id] = players[currentPlayerIndex].mark
                    
            if(checkWinner(gameBoard.getBoard)){
                gameOver = true;
                winnerMsg.style.display = "flex";
                winnerPara.textContent  = `${players[currentPlayerIndex].name} has Won!`
            }
            playerTurn()
            counterMove++

            if(gameOver === true){
                return
            }else if(counterMove === gameBoard.getBoard.length){
                gameOver = true;
                tieMsg.style.display = "flex" 
            }
            }else {
            endGame
            }
        }else{
            return
        }
    }
    let closeBtn = document.querySelectorAll(".closeBtn")

    closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
        winnerMsg.style.display = "none";
        tieMsg.style.display = "none";
        game.restartGame(gameBoard.getBoard)
    })});

    const handleClick = () => {

        cells.forEach((cell) => {
            cell.addEventListener('click',cellEvent)
        })
    }

    const endGame = () => {
        cells.forEach((cell) => {
            cell.removeEventListener('click',cellEvent) 
        })
    }

    const checkWinner = (board) => {
        const winnerCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6]
        ]

        for(let i = 0; i < winnerCombinations.length; i++){
            const [a,b,c] = winnerCombinations[i]

            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                return true
            }
        }
        return false
    }
    
    const restartBtn = document.querySelector(".restartBtn")

    
    const restartGame = (board) => {
        cells.forEach((cell) => {
            cell.textContent = "";
        })
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
        document.querySelector("#player1").value = "";
        document.querySelector("#player2").value = "";

        winnerPara.textContent = "";
        counterMove = 0
    }
    restartBtn.addEventListener('click',() =>{
        game.restartGame(gameBoard.getBoard)
    })

    
    return {
        handleClick,
        start,
        restartGame
    }

})()




