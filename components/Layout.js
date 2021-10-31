export default function Layout(props) {
	return (
		<div
			className={
				"w-full min-h-screen" +
				(props.className ? " " + props.className : "")
			}
		>
			{props.children}
		</div>
	);
}
