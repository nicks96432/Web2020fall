const Mutation = {
	createMessage: async (_, { data }, { Message, pubsub }) => {
		const message = new Message(data);
		await message.save(() =>
			pubsub.publish("message", { message: { mutation: "CREATED", data: [message] } })
		);

		return message;
	},
	deleteMessages: async (_, __, { Message, pubsub }) => {
		const messages = await Message.find();
		await Message.deleteMany({}, () =>
			pubsub.publish("message", { message: { mutation: "DELETED", data: messages } })
		);
		return messages;
	},
};

export default Mutation;
