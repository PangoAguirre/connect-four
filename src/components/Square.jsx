export function Square({ children, updateBoard, index }) {

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div className="square" onClick={handleClick}>
            {children}
        </div>
    );
}
