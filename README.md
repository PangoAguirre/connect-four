# Conecta 4 Game Development in React.js

## Project Description
The goal of this project is to develop a Connect Four game in React.js that allows two players to take turns inserting pieces into a game board. The objective is to connect four pieces of the same color either horizontally, vertically, or diagonally. The application should be dynamic, providing a smooth user experience through the use of React hooks like `useState` and `useEffect`.

## Functional Requirements

### 1. **Interactive Board:**
- Create a 6-row by 7-column board to represent the playing area.
- Players must be able to select a column to drop their piece, which will occupy the lowest available position in that column.

### 2. **Turn Management:**
- Automatically alternate turns between two players.
- Display the current player's turn on the screen.

### 3. **Win Detection:**
- Automatically detect when a player connects four pieces in any direction (horizontal, vertical, or diagonal).
- Once a winner is detected, disable interaction with the board until the game is reset.

### 4. **win counter:**
- It will count how many victories each player has and will show it on an interface.

### 5. **Game Reset:**
- Include a button to reset the game, clearing the board and restarting the state.

### 5. **Serie Reset:**
- Includes a button to reset the series, clear the board, clear the counter and reset the states.
