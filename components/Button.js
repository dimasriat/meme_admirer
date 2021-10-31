export default function Button(props) {
	return (
		<button
			onClick={props.onClick}
			className={
				"text-lg p-4 font-bold rounded-xl w-full cursor-pointer" +
				(props.className ? " " + props.className : "")
			}
		>
			{props.children}
			{/* <style jsx>{`
				button {
					background-color: ${props.bgColor};
					color: ${props.textColor};
				}
			`}</style> */}
		</button>
	);
}
