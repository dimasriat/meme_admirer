// const fs = require("fs");
// const util = require("util");
// const writeFile = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile);

import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

export default async function handler(req, res) {
	const file = await readFile("./data/memes.json", "utf-8");
	res.status(200).json(file);
}
