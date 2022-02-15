import React from "react";
import ReactDOM from "react-dom";
import { HttpLink } from "@apollo/client/link/http";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloProvider, ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import App from "./App";
import "antd/dist/antd.css";
import "./index.css";

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const websocketLink = new WebSocketLink({
	uri: "ws://localhost:4000/",
	options: { reconnect: true },
});

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === "OperationDefinition" && definition.operation === "subscription";
	},
	websocketLink,
	httpLink
);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache().restore(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
