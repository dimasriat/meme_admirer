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

function SideBar(props) {
	const { memes, order, index, handleCari, loading, started } = props;
	return (
		<>
			<div className="hidden w-1/3 lg:flex flex-col h-screen  bg-gray-800 py-4">
				<div className="h-full px-2 w-full">
					<div className="w-full h-24 relative">
						<Image
							src="/img/memefess.jpg"
							layout="fill"
							objectFit="contain"
							alt="memefess"
						/>
					</div>
					<Link href="/">
						<a className="text-4xl font-bold w-full flex flex-wrap mt-4">
							<span className="text-white">Memefess</span>
							<span className="text-pink-700">Stalker</span>
						</a>
					</Link>
				</div>
				<div className="h-full px-2">
					<Button
						onClick={handleCari}
						className="mb-4 bg-blue-700 text-white"
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
							<Button className="bg-white text-blue-700">
								Konteks? 🤔
							</Button>
						</a>
					)}
				</div>
				<div className="h-full flex items-end px-2">
					<Link href="/donasi">
						<a className="w-full">
							<Button className="mb-4 bg-pink-700 text-white">
								Donasi ❤
							</Button>
						</a>
					</Link>
				</div>
			</div>
			<div className="z-40 flex w-full lg:hidden bg-gray-800 py-4">
				<div className="w-full px-4">
					<div class={`grid grid-cols-${!loading ? "2" : "1"} gap-4`}>
						<Button
							onClick={handleCari}
							className="mb-4 bg-blue-700 text-white"
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
								<Button className="bg-white text-blue-700">
									Konteks? 🤔
								</Button>
							</a>
						)}
					</div>
					<Link href="/donasi">
						<a className="w-full">
							<Button className="bg-pink-700 text-white">
								Donasi ❤
							</Button>
						</a>
					</Link>
				</div>
			</div>
		</>
	);
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
	useEffect(() => {
		if (!loading) {
			document.getElementById("memes").scrollTop = 0;
		}
	}, [loading]);
	return (
		<Layout className="flex flex-col lg:flex-row h-screen">
			<Head>
				<title>Explore memes</title>
				<link rel="icon" type="image/jpg" href="/img/memefess.jpg" />
			</Head>
			<div
				className="w-full h-full p-4 bg-gray-900 overflow-auto"
				id="memes"
			>
				<div className="w-full h-screen relative lg:h-full">
					<Image
						src={memes[order[index]].img_url}
						layout="fill"
						objectFit="contain"
						onLoadingComplete={() => setLoading(false)}
						alt="memes"
					/>
				</div>
				{/* <p>{JSON.stringify(memes[order[index]])}</p> */}
			</div>
			<SideBar
				handleCari={handleCari}
				memes={memes}
				order={order}
				index={index}
				loading={loading}
				started={started}
			/>
		</Layout>
	);
}
