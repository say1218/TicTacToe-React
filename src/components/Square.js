const Square = ({ state, onClick }) => {
	return (
		<div
			onClick={onClick}
			style={{
				display: "inline-block",
				border: "1px solid black",
				padding: "1rem",
			}}>
			{state}
		</div>
	);
};

export default Square;
