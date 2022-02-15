import { config } from "dotenv-defaults";
config();

import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";
const { connect, connection } = mongoose;
import Message from "./models/message.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";

const pubsub = new PubSub();
if (!process.env.MONGO_URL) {
	console.error("Missing MONGO_URL!!!");
	process.exit(1);
}

connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = connection;

db.on("error", (error) => console.error(error));

db.once("open", () => {
	console.log("MongoDB connected.");

	const server = new GraphQLServer({
		typeDefs: "./server/schema.graphql",
		resolvers: {
			Query,
			Mutation,
			Subscription,
		},
		context: {
			Message,
			pubsub,
		},
	});

	const PORT = process.env.PORT || 4000;

	server.start({ port: PORT }, () => {
		console.log(`server runs at port ${PORT}.`);
	});
});
