import Image from "next/image";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Link from "next/link";

export default function Donasi() {
	return (
		<Layout style="">
			<div className="container">
				<h1>Donasi</h1>
				<div className="img-container">
					<Image
						src="/img/memeadmirer.jpg"
						layout="fill"
						objectFit="contain"
					/>
				</div>
				<p>
					Biar bisa terus ngurus websitenya dan bisa update terus	❤
				</p>
				<a href="https://saweria.co/memeadmirer" target="_blank" rel="noopener noreferrer">
					<Button textColor="white" bgColor="#CC0B7F">
						Donasi lewat Saweria
					</Button>
				</a>
				<Link href="/">
					<a>
						<Button bgColor="white" textColor="#0B1ECC">
							Balik Lihat Meme
						</Button>
					</a>
				</Link>
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
			`}</style>
		</Layout>
	);
}
