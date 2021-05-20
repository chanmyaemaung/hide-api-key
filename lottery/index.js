const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { reset } = require("nodemon");

const fetchMyApi = async () => {
	const baseUrl = "https://chanmyaemaung.net/local_data/daily/";

	try {
		const apiRes = await fetch(baseUrl);
		const apiJson = await apiRes.json();
		return apiJson;
	} catch (error) {
		return { Error: error.stack };
	}
};

router.get("/", (req, res) => {
	res.json({ message: "Yay... You've my API" });
});

router.get("/", async (req, res) => {
	const getApi = req.params;
	const data = await fetchMyApi(getApi);

	res.json(data);
});

module.exports = router;
