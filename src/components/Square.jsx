import { TURNS } from "../constants";

export function Square({ children, updateBoard, index }) {
    const handleClick = () => {
        updateBoard(index);
    };

    const squareClass =
        children === TURNS.x
            ? 'square red'
            : children === TURNS.y
            ? 'square blue'
            : 'square';

    return (
        <div className={squareClass} onClick={handleClick}></div>
    );
}
