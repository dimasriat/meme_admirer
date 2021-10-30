export default function Layout(props) { 
	return (
		<div className="container">
			{props.children}
			<style jsx>{`
				.container {
					// background-color: aqua;
					width: 100%;
					min-height: 100vh;
					${props.style ? props.style : ""}
				}
			`}</style>
		</div>
	);
}
