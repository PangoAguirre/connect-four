import { TURNS } from "../constants/constants";

export const move = (index, currentBoard, currentTurn) => {
    const colSelected = index % 7;
    if (currentBoard[colSelected]) return [currentBoard, null]

    const newBoard = [...currentBoard]
    for (let i = colSelected + 35; i >= colSelected; i -= 7) {
        if (!newBoard[i]) {
            newBoard[i] = currentTurn;
            return [newBoard, i];
        }
    }
    return [currentBoard, null];
};

export const checkWinner = (index, board, turn) => {
    const directions = [1, -1, 7, -7, 8, -8, 6, -6];

    for (let dir of directions) {
        if (!((index + 1) % 7 === 0)) {
            if (
                board[index + dir] === turn &&
                board[index + dir * 2] === turn &&
                board[index + dir * 3] === turn
            ) {
                return turn;
            }
        } else if (!(dir === 1) && (index + 1) % 7 === 0) {
            if (
                board[index + dir] === turn &&
                board[index + dir * 2] === turn &&
                board[index + dir * 3] === turn
            ) {
                return turn;
            }
        }
    }

    return null;
};

export const getNextTurn = (prevTurn) => {return prevTurn === TURNS.x ? TURNS.y : TURNS.x}