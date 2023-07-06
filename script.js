const gameBoard = (() => {
    const board = ['','','','','','','','',''];
    const getBoard = board
    return {
        getBoard,
    }
})()

function player(name,mark){
    return {name, mark}
}

