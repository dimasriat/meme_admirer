const axios = require("axios");
const Twit = require("twit");

class Twitskuy extends Twit {
	consumer_key = "";
	consumer_secret = "";
	access_token = "";
	access_token_secret = "";
	bearer_token = "";
	auto_log = false;
	constructor({
		consumer_key,
		consumer_secret,
		access_token,
		access_token_secret,
		bearer_token,
	}) {
		super({
			consumer_key,
			consumer_secret,
			access_token,
			access_token_secret,
			timeout_ms: 60 * 1000,
			strictSSL: true,
		});
		this.consumer_key = consumer_key;
		this.consumer_secret = consumer_secret;
		this.access_token = access_token;
		this.access_token_secret = access_token_secret;
		this.bearer_token = bearer_token;
	}

	setAutoLog(bool = true) {
		this.auto_log = bool;
	}

	apiv1(method, path, params_object) {
		const autolog = this.auto_log;
		return new Promise((resolve, reject) => {
			if (method.toLowerCase() === "get") {
				this.get(path, params_object, function (err, json, response) {
					if (err) {
						reject(err);
					}
					if (autolog) console.log(JSON.stringify(json, 0, 2));
					resolve(json);
				});
			} else if (method.toLowerCase() === "post") {
				this.post(path, params_object, function (err, json, response) {
					if (err) {
						reject(err);
					}
					if (autolog) console.log(JSON.stringify(json, 0, 2));
					resolve(json);
				});
			}
		});
	}

	apiv2(method, path, params_object) {
		const base = "https://api.twitter.com/2/";
		let params = "?";
		const pair_array = Object.keys(params_object).map((key) => [
			key,
			params_object[key],
		]);
		for (let i = 0; i < pair_array.length; i++) {
			params = `${params}${pair_array[i][0]}=${pair_array[i][1]}`;
			if (i < pair_array.length - 1) {
				params = `${params}&`;
			}
		}
		const url = base + path + params;
		return new Promise((resolve, reject) => {
			axios({
				method,
				url,
				headers: {
					Authorization: `Bearer ${this.bearer_token}`,
				},
				withCredentials: true,
			})
				.then((res) => {
					const json = res.data;
					if (this.auto_log) console.log(JSON.stringify(json, 0, 2));
					resolve(json);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

module.exports = Twitskuy;
