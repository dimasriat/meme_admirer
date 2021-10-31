import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Link from "next/link";

export default function Donasi() {
	return (
		<Layout className="px-8 lg:px-48 md:px-24 bg-gray-800 text-white">
			<Head>
				<title>Memefess Stalker</title>
				<link rel="icon" type="image/jpg" href="/img/memefess.jpg" />
			</Head>
			<div className="container grid grid-cols-1 gap-8 pb-8 mx-auto">
				<div className="pt-8 text-center font-bold text-4xl">
					<span className="text-white">Donasi</span>
				</div>
				<div className="w-full h-64 relative">
					<Image
						src="/img/dahyun.jpg"
						layout="fill"
						objectFit="contain"
						alt="Dahyun"
					/>
				</div>
				<p className="text-center ">
					Biar bisa terus ngurus websitenya dan bisa update terus ❤
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-1/2 mx-auto">
					<a
						href="https://saweria.co/memeadmirer"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button className="mb-4 bg-pink-700 text-white">
							Donasi lewat Saweria
						</Button>
					</a>
					<Link href="/explore">
						<a>
							<Button className="mb-4 bg-blue-700 text-white">
								Balik Lihat Meme
							</Button>
						</a>
					</Link>
					<Link href="/">
						<a>
							<Button className="mb-4 bg-white text-blue-700">
								Balik Halaman Awal
							</Button>
						</a>
					</Link>
				</div>
				<div className="w-full lg:w-1/2 mx-auto">
					<p className="font-bold">Daftar Donatur</p>
					<div className="mt-4">
						<p className="">Dimas | 2021-10-29 18:35:40 | Rp25.000</p>
						<p className="italic">"Buat beli rokok"</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}
