require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const weather = require("./weather");
const lottery = require("./lottery");

app.use(express.json());

// Whitelist IP Address
const whitelist = ["http://127.0.0.1", "http://127.0.0.1:5500"];
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || whitelist.indexOf(origin !== -1)) {
			callback(null, true);
		} else {
			callback(new Error("No allowed by CORS"));
		}
	},
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const limiter = rateLimit({
	windowMs: 1000,
	max: 1,
});

app.use(limiter);

// Default route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to my world! ✌" });
});

app.use("/weather", weather);
app.use("/lottery", lottery);

app.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`)
);
