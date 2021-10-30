import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import { useState } from "react";
import memes from "../data/memes.json";
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

export default function Home() {
	const [index, setIndex] = useState(memes.length - 2);
	const [order, setOrder] = useState(getShuffledIndexes(memes));

	return (
		<Layout style="display: flex;">
			<div className="left">
				<div className="img-container">
					<Image
						src={memes[order[index]].img_url}
						layout="fill"
						objectFit="contain"
					/>
				</div>
			</div>
			<div className="right">
				<div className="col">
					<h1>Memefess Stalker</h1>
				</div>
				<div className="col">
					<Button
						onClick={() => setIndex((i) => (i + 1) % memes.length)}
						textColor="white"
						bgColor="#0B1ECC"
					>
						Cari! 👀
					</Button>
					<Button bgColor="white" textColor="#0B1ECC">
						Konteks? 🤔
					</Button>
				</div>
				<div className="col donate">
					<p>lorem ipsum sir dolor amet</p>
					<Link href="/donasi">
						<a>
							<Button
								onClick={() => setIndex((i) => i + 1)}
								textColor="white"
								bgColor="#CC0B7F"
							>
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
				}
			`}</style>
		</Layout>
	);
}

// Page.getInitialProps = async (ctx) => {
//   return ({ memes });
// }
