import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import data from "../data/memes.json";
import Button from "../components/Button";

function getShuffledIndexes(not_me_array) {
	const array = [...Array(not_me_array.length).keys()];
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

export default function Explore() {
	const [started, setStarted] = useState(false);
	const [index, setIndex] = useState(0);
	const [order, setOrder] = useState();
	const [loading, setLoading] = useState(false);
	const [memes, setMemes] = useState([...data]);
	const handleCari = () => {
		setLoading(true);
		setIndex((i) => (i + 1) % memes.length);
	};
	useEffect(() => {
		setOrder(getShuffledIndexes(memes));
		setStarted(true);
	}, []);
	return (
		<Layout style="display: flex;">
			<Head>
				<title>MEMEFESS BROWSE</title>
				<link rel="icon" type="image/jpg" href="/img/memefess.jpg" />
			</Head>
			<div className="left">
				{started ? (
					<div className="img-container">
						<Image
							src={memes[order[index]].img_url}
							layout="fill"
							objectFit="contain"
							onLoadingComplete={() => setLoading(false)}
						/>
					</div>
				) : (
					<p>loading</p>
				)}
				{/* <p>{JSON.stringify(memes[order[index]])}</p> */}
			</div>
			<div className="right">
				<div className="col">
					<h1>Memefess Stalker</h1>
				</div>
				<div className="col">
					<Button
						onClick={handleCari}
						textColor="white"
						bgColor="#0B1ECC"
					>
						{loading || !started ? "loading..." : "Cari! 👀"}
					</Button>
					{started && !loading && (
						<a
							target="_blank"
							href={
								"https://twitter.com/memefess/status/" +
								memes[order[index]].id
							}
							rel="noopener noreferrer"
						>
							<Button bgColor="white" textColor="#0B1ECC">
								Konteks? 🤔
							</Button>
						</a>
					)}
				</div>
				<div className="col donate">
					<Link href="/donasi">
						<a>
							<Button textColor="white" bgColor="#CC0B7F">
								Donasi ❤
							</Button>
						</a>
					</Link>
				</div>
			</div>
			<style jsx>{`
				.left {
					width: 70%;
					background-color: white;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 2rem 0;
				}
				.right {
					width: 30%;
					background-color: #fdc965;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 0 1rem;
				}
				.col {
					height: 100%;
					width: 100%;
				}

				.col.donate {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
				}

				.img-container {
					width: 100%;
					height: 100%;
					// background-color: pink;
					position: relative;
					margin: 0 2rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				iframe {
					width: 100%;
					height: 100%;
					border: none;
				}
			`}</style>
		</Layout>
	);
}

// Page.getInitialProps = async (ctx) => {
//   return ({ memes });
// }
