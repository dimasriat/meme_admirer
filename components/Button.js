export default function Button(props) {
	return (
		<button onClick={props.onClick}>
			{props.children}
			<style jsx>{`
				button {
					font-size: 1rem;
					background-color: ${props.bgColor};
					color: ${props.textColor};
					padding: 1.5rem;
					font-weight: bold;
					border-radius: 1rem;
					border: none;
					width: 100%;
					margin: 0.5rem 0;
					cursor: pointer;
				}
			`}</style>
		</button>
	);
}
