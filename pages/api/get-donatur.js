// const fs = require("fs");
// const util = require("util");
// const writeFile = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile);

export default async function handler(req, res) {
	const donatur = [
		{
			dari: "Dimas",
			tanggal: "2021-10-29 18:35:40",
			nominal: "Rp25.000",
			pesan: "Buat beli rokok",
		},
		{
			dari: "Dimas",
			tanggal: "2021-10-29 18:35:40",
			nominal: "Rp10.000",
			pesan: "hai",
		},
	];
	res.status(200).json(donatur);
}
