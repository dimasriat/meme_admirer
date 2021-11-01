import Head from "next/head";
export default function Layout(props) {
	return (
		<div
			className={
				"w-full min-h-screen" +
				(props.className ? " " + props.className : "")
			}
		>
			<Head>
				<title>{props.title}</title>
				<link rel="icon" type="image/jpg" href="/img/memefess.jpg" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@memeadmirer" />
				<meta name="twitter:title" content="MemefessStalker" />
				<meta
					name="twitter:description"
					content="kumpulan meme di @memefess secara random"
				/>
				<meta
					name="twitter:image"
					content="https://memefess.online/img/memefess.jpg"
				/>
				<link rel="manifest" href="/manifest.json" />
				<link
					href="/img/favicon-16x16.png"
					rel="icon"
					type="image/png"
					sizes="16x16"
				/>
				<link
					href="/img/favicon-32x32.png"
					rel="icon"
					type="image/png"
					sizes="32x32"
				/>
				<link rel="apple-touch-icon" href="/apple-icon.png"></link>
				<meta name="theme-color" content="#1f2937" />
			</Head>
			{props.children}
		</div>
	);
}
