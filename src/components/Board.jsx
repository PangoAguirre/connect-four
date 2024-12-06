import { useEffect, useState } from "react";
import { Square } from "./Square";
import { TURNS } from '../constants';

export function Board() {
    const [board, setBoard] = useState(Array(42).fill(null))
    const [turn, setTurn] = useState(TURNS.x)
    const [winner, setWinner] = useState(null)
    const [redWins, setRedWins] = useState(0)
    const [blueWins, setBlueWins] = useState(0)
    const [loser, setLoser] = useState(null)

    const updateBoard = (index) => {
        if (winner) return

        const newBoard = move(index, [...board], turn);
        setBoard(newBoard);

        setTurn(turn === TURNS.x ? TURNS.y : TURNS.x)
    };

    const move = (index, currentBoard, currentTurn) => {
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
            if (winner === TURNS.x) {
                setLoser(TURNS.y)
            } else if (winner === TURNS.y) {
                setLoser(TURNS.x)
            }
        }
    }, [board, turn])

    const resetGame = () => {
        console.log(loser + "antes" + turn)
        if (loser === TURNS.x) {
            setTurn(TURNS.x)
        } else if (loser === TURNS.y) {
            setTurn(TURNS.y)
        }
        console.log(loser + "después" + turn)
        setWinner(null)
        setBoard(Array(42).fill(null))
    }

    useEffect(() => {
        if (winner === TURNS.x) {
            setRedWins((prevRedWins) => prevRedWins + 1);
        }
        if (winner === TURNS.y) {
            setBlueWins((prevBlueWins) => prevBlueWins + 1);
        }
    }, [winner]);    

    const resetSerie = () => {
        setBlueWins(0)
        setRedWins(0)
        
        setTurn(TURNS.x)
        setWinner(null)
        setBoard(Array(42).fill(null))
    }
    

    return (
        <div className="game">
            {winner && <section className={winner === TURNS.x ? 'winner-modal-red' : 'winner-modal-blue'}>
                <h1>Ganador</h1>
                <span>{winner === TURNS.x ? 'ROJO' : 'AZÚL'}</span>
            </section>}
            <main className={turn === TURNS.x ? 'boardRed' : 'boardBlue'}>
                {board.map((square, index) => (
                    <Square key={index} updateBoard={updateBoard} index={index}>
                        {square}
                    </Square>
                ))}
            </main>
            <aside className="info">
                <section className="game-score">
                    <div className="score">
                        <h2 className="red-score">Rojo</h2>
                        <span className="red-score">{redWins}</span>
                    </div>
                    <div className="score">
                        <h2 className="blue-score">Azul</h2>
                        <span className="blue-score">{blueWins}</span>
                    </div>
                </section>
                <section className="buttons">
                    <button onClick={resetGame}>
                        Reiniciar partida
                    </button>
                    <button onClick={resetSerie}>
                        Reiniciar serie
                    </button>
                </section>
            </aside>
        </div>
    );
}
