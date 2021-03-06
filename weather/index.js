const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchWeather = async (searchtext) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

	try {
		const weatherStream = await fetch(url);
		const weatherJson = await weatherStream.json();
		return weatherJson;
	} catch (error) {
		return { Error: error.stack };
	}
};

router.get("/", (req, res) => {
	res.send({ success: "Yahoo... You'd got my API! 😲" });
});

router.get("/:searchtext", async (req, res) => {
	const searchtext = req.params.searchtext;
	const data = await fetchWeather(searchtext);

	res.json(data);
});

router.post("/", async (req, res) => {
	const searchtext = req.body.searchtext;
	const data = await fetchWeather(searchtext);

	res.json(data);
});

module.exports = router;
