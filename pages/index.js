import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Link from "next/link";

export default function Donasi() {
	return (
		<Layout style="">
			<Head>
				<title>Memefess Stalker</title>
				<link rel="icon" type="image/jpg" href="/img/memefess.jpg" />
			</Head>
			<div className="container">
				<h1>Memefess Stalker</h1>
				<div className="img-container">
					<Image
						src="/img/memefess.jpg"
						layout="fill"
						objectFit="contain"
					/>
				</div>
				<p>3000+ meme untukmu</p>
				<div className="button">
					<Link href="/explore">
						<a>
							<Button textColor="white" bgColor="#0B1ECC">
								Explore 😎
							</Button>
						</a>
					</Link>
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
				.button {
					width: 100%;
					display: flex;
					margin-top: 1rem;
				}
				a {
					width: 100%;
					margin: 0 0.5rem;
				}
			`}</style>
		</Layout>
	);
}
