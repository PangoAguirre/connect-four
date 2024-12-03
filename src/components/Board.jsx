import { useState } from "react";
import { Square } from "./Square";
import { TURNS } from '../constants';

export function Board() {
    const [board, setBoard] = useState(Array(42).fill(null));
    const [turn, setTurn] = useState(TURNS.x);

    const updateBoard = (index) => {
        const newBoard = move(index, [...board], turn);
        const newTurn = turn === TURNS.x ? TURNS.y : TURNS.x
        setBoard(newBoard);
        setTurn(newTurn)
    };

    const move = (index, board, turn) => {

        const colSelected = index % 7;
        if (board[colSelected]) return board

        for (let i = colSelected + 35; i >= colSelected; i -= 7) {
            if (!board[i]) {
                board[i] = turn;
                return board;
            }
        }
        return board;
    };

    return (
        <main className="board">
            {board.map((square, index) => {
                return <Square key={index} updateBoard={updateBoard} index={index}>{square}</Square>;
            })}
        </main>
    );
}
