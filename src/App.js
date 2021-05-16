import "./App.css";
import Square from "./components/Square";
import { useState, useEffect, useRef } from "react";

const initialState = ["", "", "", "", "", "", "", "", ""];

function App() {
	const [gameState, setGameState] = useState(initialState);
	const [isXChance, setIsXChance] = useState(false);
	const [historyState, setHistoryState] = useState([]);
	let winner = useRef("");

	const onSquareClick = (cell) => {
		console.log(cell);
		let stringToDisplay = isXChance ? "0" : "X";
		setIsXChance(!isXChance);

		let arr = [...gameState];
		arr[cell] = stringToDisplay;

		// let isHistory = historyState.filter((elem) => elem.cell === cell);

		// if (isHistory.length > 0) {
		// 	let index = historyState.indexOf(isHistory);
		// 	console.log(index);
		// }

		setGameState([...arr]);

		let historyObj = {
			currentState: [...arr],
			currentPlayer: stringToDisplay,
			cell: cell,
		};
		setHistoryState([...historyState, { ...historyObj }]);
	};

	useEffect(() => {
		let player = isXChance ? "0" : "X";
		let win = calculateWinner(gameState);
		if (win === "X" || win === "0") {
			winner.current = "Winner: " + player;
		} else {
			winner.current = "Player: " + player;
		}
		console.log(winner.current);
	}, [gameState]);

	function resetGame() {
		setGameState([]);
		setHistoryState([]);
	}

	function jumpTo(index) {
		console.log("historyState is", historyState);

		let history = historyState[index - 1];
		console.log("history is", history);
		setGameState([...history.currentState]);
	}

	function calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				console.log(squares[a]);
				return squares[a];
			}
		}
		return null;
	}

	return (
		<div className='App'>
			<div>{winner.current}</div>

			<div>
				<Square onClick={() => onSquareClick(0)} state={gameState[0]} />
				<Square onClick={() => onSquareClick(1)} state={gameState[1]} />
				<Square onClick={() => onSquareClick(2)} state={gameState[2]} />
			</div>
			<div>
				<Square onClick={() => onSquareClick(3)} state={gameState[3]} />
				<Square onClick={() => onSquareClick(4)} state={gameState[4]} />
				<Square onClick={() => onSquareClick(5)} state={gameState[5]} />
			</div>
			<div>
				<Square onClick={() => onSquareClick(6)} state={gameState[6]} />
				<Square onClick={() => onSquareClick(7)} state={gameState[7]} />
				<Square onClick={() => onSquareClick(8)} state={gameState[8]} />
			</div>
			<button onClick={resetGame}>Clear Game</button>

			<div>
				{historyState.length > 0 &&
					historyState.map((elem, index) => {
						return (
							<div>
								<button onClick={() => jumpTo(index)}>{`Jump to Move ${
									index + 1
								}`}</button>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;
