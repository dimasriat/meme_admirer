import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Link from "next/link";

export default function Home() {
	return (
		<Layout className="px-8 lg:px-48 md:px-24 bg-gray-800 text-white">
			<Head>
				<title>Memefess Stalker</title>
				<link rel="icon" type="image/jpg" href="/img/memefess.jpg" />
			</Head>
			<div className="container grid grid-cols-1 gap-8 px-4 mx-auto">
				{/* <h1 className="pt-8 text-center font-bold text-4xl">
					Memefess Stalker
				</h1> */}
					<Link href="/">
						<a className="pt-8 text-center font-bold text-4xl">
							<span className="text-white">Memefess</span>
							<span className="text-pink-700">Stalker</span>
						</a>
					</Link>
				<div className="w-full h-64 relative">
					<Image
						src="/img/memefess.jpg"
						layout="fill"
						objectFit="contain"
						alt="memefess"
					/>
				</div>
				<p className="text-center ">3000+ meme untukmu</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-1/2 mx-auto">
					<Link href="/explore">
						<a>
							<Button className="mb-4 bg-blue-700 text-white">
								Explore 😎
							</Button>
						</a>
					</Link>
					<Link href="/donasi">
						<a>
							<Button className="mb-4 bg-pink-700 text-white">
								Donasi ❤
							</Button>
						</a>
					</Link>
				</div>
			</div>
			{/* <style jsx>{`
				.container {
					display: flex;
					width: 100%;
					max-width: 640px;
					margin: 0 auto;
					flex-direction: column;
					align-items: center;
					padding: 0 1rem;
					// background-color: aqua;
				}

				.img-container {
					width: 100%;
					height: 240px;

					// background-color: pink;
					position: relative;
					margin: 1rem 0;
				}
			`}</style> */}
		</Layout>
	);
}
