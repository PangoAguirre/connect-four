import { useState } from "react";
import { Square } from "./Square";
import { TURNS } from '../constants';

export function Board() {
    const [board, setBoard] = useState(Array(42).fill(null));
    const [turn, setTurn] = useState(TURNS.x);
    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {
        if (winner) return
        const [newBoard, newIndex] = move(index, [...board], turn);
        const newTurn = turn === TURNS.x ? TURNS.y : TURNS.x
        const newWinner = checkWinner(newIndex, newBoard, turn)
        setBoard(newBoard);
        setTurn(newTurn)
        setWinner(newWinner)
    };

    const move = (index, board, turn) => {

        const colSelected = index % 7;
        if (board[colSelected]) return board

        for (let i = colSelected + 35; i >= colSelected; i -= 7) {
            if (!board[i]) {
                board[i] = turn;
                return [board, i];
            }
        }
        return board;
    };

    const checkWinner = (index, board, turn) => {
        if (!board[index]) return null;

        const directions = [
            1, -1,
            7, -7,
            8, -8,
            6, -6
        ];
    
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
    

    return (
        <main className="board">
            {board.map((square, index) => {
                return <Square key={index} updateBoard={updateBoard} index={index}>{square}</Square>;
            })}
        </main>
    );
}
