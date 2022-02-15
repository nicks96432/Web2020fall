import React, { useEffect, useRef, useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { messagesWith, createMessage, deleteMessages, subscription } from "./graphql";
import { Button, Input, message, Tag } from "antd";
import "./App.css";

const App = () => {
	const [from, setFrom] = useState("");
	const [start, setStart] = useState(false);
	const { loading, error, data, subscribeToMore } = useQuery(messagesWith, {
		variables: { name: from },
	});
	const [sendMessage] = useMutation(createMessage);
	const [clearMessages] = useMutation(deleteMessages);
	const [to, setTo] = useState("");
	const [body, setBody] = useState("");
	const bodyRef = useRef(null);

	useEffect(() => {
		if (start)
			subscribeToMore({
				document: subscription,
				variables: { name: from },
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev;
					const { data: newMessage, mutation } = subscriptionData.data.messagesWith;
					if (mutation === "DELETED")
						return {
							messagesWith: prev.messagesWith.filter(
								(m) =>
									!newMessage.some(
										(e) =>
											e.from === m.from && e.to === m.to && e.body === m.body
									)
							),
						};

					return { ...prev, messagesWith: [...prev.messagesWith, ...newMessage] };
				},
			});
	}, [subscribeToMore, start, from]);

	const displayStatus = (s) => {
		if (s.msg) {
			const { type, msg } = s;
			const content = {
				content: msg,
				duration: 0.5,
			};

			switch (type) {
				case "success":
					message.success(content);
					break;
				case "info":
					message.info(content);
					break;
				case "danger":
				default:
					message.error(content);
					break;
			}
		}
	};

	const handleSubmit = useCallback(() => {
		if (!from || !to || !body) {
			displayStatus({
				type: "error",
				msg: "Please enter a username and a message body.",
			});
			return;
		}
		sendMessage({ variables: { from: from, to: to, body: body } });
		setBody("");
	}, [sendMessage, from, to, body]);

	return (
		<div className="App">
			<div className="App-title">
				<h1>Simple Chat</h1>
				{start ? (
					<Button
						type="primary"
						danger
						onClick={() => clearMessages({ variables: { name: from } })}
					>
						Clear
					</Button>
				) : (
					<></>
				)}
			</div>
			{start ? (
				<>
					<div className="App-messages">
						{loading ? (
							<p style={{ color: "#ccc" }}>Loading...</p>
						) : error ? (
							<p style={{ color: "#ccc" }}>{error}</p>
						) : data.messagesWith.length ? (
							data.messagesWith.map((message, i) => (
								<p className="App-message" key={i}>
									{message.from !== from ? (
										<Tag color="default">{`From: ${message.from}`}</Tag>
									) : (
										<></>
									)}
									{message.from === from && message.to !== from ? (
										<Tag color="blue">{`To: ${message.to}`}</Tag>
									) : (
										<></>
									)}
									{message.body}
								</p>
							))
						) : (
							<p style={{ color: "#ccc" }}>No messages...</p>
						)}
					</div>
					<Input.Search
						placeholder="Username"
						value={from}
						enterButton="Enter"
						onChange={(e) => setFrom(e.target.value)}
						onSearch={() => {
							setStart(true);
						}}
						disabled={start}
						style={{ marginBottom: 10 }}
					/>
					<Input
						placeholder="To..."
						value={to}
						onChange={(e) => setTo(e.target.value)}
						style={{ marginBottom: 10 }}
						disabled={!start}
						onKeyDown={(e) => {
							if (e.key === "Enter") bodyRef.current.focus();
						}}
					/>
					<Input.Search
						rows={4}
						value={body}
						ref={bodyRef}
						enterButton="Send"
						disabled={!start}
						onChange={(e) => setBody(e.target.value)}
						placeholder="Type your message here..."
						onSearch={handleSubmit}
					/>
				</>
			) : (
				<Input.Search
					placeholder="Username"
					value={from}
					enterButton="Enter"
					onChange={(e) => setFrom(e.target.value)}
					onSearch={() => {
						setStart(from);
					}}
					disabled={start}
					style={{ margin: "20px 0" }}
				/>
			)}
		</div>
	);
};

export default App;
