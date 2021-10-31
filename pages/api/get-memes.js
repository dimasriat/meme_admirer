// const fs = require("fs");
// const util = require("util");
// const writeFile = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile);

import memes from "./memes.json";

export default async function handler(req, res) {
	res.status(200).json(memes);
}
