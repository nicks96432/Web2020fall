require("dotenv-defaults").config();

const { GraphQLServer, PubSub } = require("graphql-yoga");

const { connect, connection } = require("mongoose");
const Message = require("./models/message");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");

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
