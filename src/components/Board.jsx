import { useEffect, useState } from "react";
import { Square } from "./Square";
import { TURNS } from '../constants';
import { move, checkWinner } from "../logic/board";

export function Board() {
    const [board, setBoard] = useState(Array(42).fill(null))
    const [turn, setTurn] = useState(TURNS.x)
    const [lastMoveIndex, setLastMoveIndex] = useState(null)
    const [winner, setWinner] = useState(null)
    const [redWins, setRedWins] = useState(0)
    const [blueWins, setBlueWins] = useState(0)
    const [loser, setLoser] = useState(null)

    const updateBoard = (index) => {
        if (winner) return

        const [newBoard, lastMoveIndex] = move(index, [...board], turn);

        if (!lastMoveIndex) return

        setLastMoveIndex(lastMoveIndex)
        setBoard(newBoard);

        setTurn(turn === TURNS.x ? TURNS.y : TURNS.x)
    };

    useEffect(() => {
        if (!lastMoveIndex) return
        const winner = checkWinner(lastMoveIndex, board, turn === TURNS.x ? TURNS.y : TURNS.x)
        setWinner(winner)
        if (winner === TURNS.x) {
            setLoser(TURNS.y)
        } else if (winner === TURNS.y) {
            setLoser(TURNS.x)
        }
    }, [board, lastMoveIndex, turn])

    const resetGame = () => {
        console.log(loser + "antes" + turn)
        if (loser === TURNS.x) {
            setTurn(TURNS.x)
        } else if (loser === TURNS.y) {
            setTurn(TURNS.y)
        }
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
            {winner && 
                <section className={winner === TURNS.x ? 'winner-modal-red' : 'winner-modal-blue'}>
                    <h1>Ganador</h1>
                    <span>{winner === TURNS.x ? 'ROJO' : 'AZÚL'}</span>
                </section>
            }
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
