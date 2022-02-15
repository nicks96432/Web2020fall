require("dotenv-defaults").config();

const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const Message = require("./models/message");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

if (!process.env.MONGO_URL) {
	console.error("Missing MONGO_URL!!!");
	process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => {
	console.log("MongoDB connected!");

	wss.on("connection", (socket) => {
		const sendData = (data) => socket.send(JSON.stringify(data));

		const sendStatus = (s) => sendData(["status", s]);

		Message.find()
			.limit(100)
			.sort({ _id: 1 })
			.exec((err, res) => {
				if (err) throw err;
				// initialize app with existing messages
				sendData(["init", res]);
			});

		socket.onmessage = (message) => {
			const { data } = message;
			console.log(data);
			const [task, payload] = JSON.parse(data);
			switch (task) {
				case "input":
					Message.insertMany([payload], () => sendData(["output", [payload]]));
					break;

				case "clear":
					Message.deleteMany({}, () => {
						sendData(["cleared"]);
						sendStatus({ type: "info", msg: "Message cache cleared." });
					});
					break;

				default:
					break;
			}
		};
	});

	const PORT = process.env.port || 4000;

	server.listen(PORT, () => {
		console.log(`Listening on https://localhost:${PORT}`);
	});
});
