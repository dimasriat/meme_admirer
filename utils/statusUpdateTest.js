const moment = require("moment");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const copyFile = util.promisify(fs.copyFile);
const path = require("path");
const caption = require("../data/caption.json");

const Twitskuy = require("./Twitskuy");
const config = require("./config");
const memeadmirer = {
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret,
	bearer_token: config.bearer_token,
};
const meme = new Twitskuy(memeadmirer);

async function updateStatus(username, tweets) {
	return new Promise(async (resolve, reject) => {
		const user = await meme.apiv2("get", `users/by/username/${username}`, {
			"user.fields": "created_at",
		});
		console.log(user);
		// resolve("sukses");
		tweets.forEach(async (status) => {
			await meme.apiv1("post", "statuses/update", { status });
			console.log("updated:", status);
		});
		resolve();
	});
}

async function viewStatuses(username) {
	return new Promise(async (resolve, reject) => {
		const user = await meme.apiv2("get", `users/by/username/${username}`, {
			"user.fields": "created_at",
		});
		console.log(user);
		const start_time = moment(
			user.data.created_at,
			"YYYY-MM-DD[T]HH:mm:ss[.000Z]"
		).format("YYYY-MM-DD[T]HH:mm:ss[.000Z]");
		console.log(start_time);
		let end_time = moment().format("YYYY-MM-DD[T]HH:mm:ss[.000Z]");
		const statuses = await meme.apiv2(
			"get",
			`users/${user.data.id}/tweets`,
			{
				"tweet.fields": "text,created_at",
				"media.fields": "url",
				expansions: "attachments.media_keys",
				start_time,
				end_time,
				max_results: `100`,
			}
		);
		resolve(statuses);
	});
}

async function replyStatuses(statuses) {
	return new Promise(async (resolve, reject) => {
		statuses.forEach(async (obj) => {
			await meme.apiv1("post", "statuses/update", {
				status: `Hey, you said: ${obj.text}`,
				in_reply_to_status_id: obj.id,
			});
			console.log("updated:", obj.text);
		});
		resolve();
	});
}

async function destroyStatuses(statuses) {
	return new Promise(async (resolve, reject) => {
		statuses.forEach(async (obj) => {
			await meme.apiv1("post", "statuses/destroy", {
				id: obj.id,
			});
		});
		resolve();
	});
}

async function gatherImage(json) {
	return new Promise(async (resolve, reject) => {
		// console.log(JSON.stringify(json, 0, 2));

		/**
		 * { created_at, id, img_url }
		 */
		let media_keys = {};
		json.includes.media
			.filter((item) => item.type === "photo")
			.forEach((item) => {
				media_keys[item.media_key] = { img_url: item.url };
			});

		/**
		 * menggabungkan data dan includes menggunakan media_key
		 * kemudian hasil gabungannya dimasukkan ke array baru
		 * bernama result
		 */
		let result = [];
		json.data.forEach((item) => {
			if (item.attachments) {
				item.attachments.media_keys.forEach((mk) => {
					if (media_keys[mk]) {
						result.push({
							created_at: item.created_at,
							id: item.id,
							...media_keys[mk],
						});
					}
				});
			}
		});

		resolve(result);
	});
}

async function updateResult(filename, username) {
	return new Promise(async (resolve, reject) => {
		const user = await meme.apiv2("get", `users/by/username/${username}`, {
			"user.fields": "created_at",
		});
		console.log(user);
		await copyFile(
			filename,
			`./data/${path.parse(filename).name}_${moment().format(
				"YYYY_MM_DD_HH_mm_ss"
			)}${path.parse(filename).ext}`
		);
		// resolve();
		const file = await readFile(filename, "utf-8");
		const old_json = JSON.parse(file);
		const start_time = moment(
			old_json[0].created_at,
			"YYYY-MM-DD[T]HH:mm:ss[.000Z]"
		)
			.add(1, "s")
			.format("YYYY-MM-DD[T]HH:mm:ss[.000Z]");
		console.log(start_time);
		let end_time = moment().format("YYYY-MM-DD[T]HH:mm:ss[.000Z]");
		let count = 0;
		let paused = false;
		let all_new_json = [];
		const loop = setInterval(async () => {
			console.log("looping...");
			try {
				if (!paused) {
					paused = true;
					console.log("iterasi ke:", count);
					const api_call = await meme.apiv2(
						"get",
						`users/${user.data.id}/tweets`,
						{
							"tweet.fields": "text,created_at",
							"media.fields": "url",
							expansions: "attachments.media_keys",
							start_time,
							end_time,
							max_results: `100`,
						}
					);
					if (!api_call.data) {
						console.log("stopped");
						const combined_json = [...all_new_json, ...old_json];
						await writeFile(
							filename,
							JSON.stringify(combined_json, 0, 2),
							"utf8"
						);
						clearInterval(loop);
						resolve();
					} else {
						const new_json = await gatherImage(api_call);
						console.log(
							"written: ",
							JSON.stringify(new_json, 0, 2)
						);
						all_new_json = [...all_new_json, ...new_json];
						//
						end_time =
							api_call.data[api_call.data.length - 1].created_at;
						count++;
						console.log({
							count: count * 100,
							start_time,
							end_time,
							length: api_call.data.length,
						});
						paused = false;
					}
				}
			} catch (err) {
				console.log("waiting for error:", err);
				paused = false;
			}
		}, 1000);
	});
}

async function main() {
	// const result = await updateStatus("memeadmirer", caption);
	// const result = await viewStatuses("memeadmirer");
	await updateResult("./data/memes.json", "memefess");
	// console.log(result);
	// console.log("berhasil dihapus");
}

main();
