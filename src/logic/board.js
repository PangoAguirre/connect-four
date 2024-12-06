export const move = (index, currentBoard, currentTurn) => {
    const colSelected = index % 7;
    if (currentBoard[colSelected]) return currentBoard

    const newBoard = [...currentBoard]
    for (let i = colSelected + 35; i >= colSelected; i -= 7) {
        if (!newBoard[i]) {
            newBoard[i] = currentTurn;
            return newBoard;
        }
    }
    return currentBoard;
};

export const checkWinner = (index, board, turn) => {
    const directions = [1, -1, 7, -7, 8, -8, 6, -6];
    for (let dir of directions) {
        if (
            board[index + dir] === turn &&
            board[index + dir * 2] === turn &&
            board[index + dir * 3] === turn
        ) {
            return turn;
        }
    }
    return null;
};