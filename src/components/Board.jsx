import { useEffect, useState } from "react";
import { Square } from "./Square";
import { TURNS } from '../constants';

export function Board() {
    const [board, setBoard] = useState(Array(42).fill(null))
    const [turn, setTurn] = useState(TURNS.x)
    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {
        if (winner) return

        const [newBoard, newMoveIndex] = move(index, [...board], turn);
        if (newMoveIndex === null) return

        setBoard(newBoard);
        setTurn(turn === TURNS.x ? TURNS.y : TURNS.x)
    };

    const move = (index, currentBoard, currentTurn) => {

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

    const checkWinner = (index, board, turn) => {
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

    useEffect(() => {
        const lastTurn = turn === TURNS.x ? TURNS.y : TURNS.x
        const lastMoveIndex = board.lastIndexOf(lastTurn)
        if (lastMoveIndex !== -1) {
            const winner = checkWinner(lastMoveIndex, board, lastTurn)
            setWinner(winner)
        }
    }, [board, turn])
    

    return (
        <main className="board">
            {board.map((square, index) => {
                return (
                    <Square key={index} updateBoard={updateBoard} index={index}>
                        {square}
                    </Square>
                )
            })}
        </main>
    );
}
