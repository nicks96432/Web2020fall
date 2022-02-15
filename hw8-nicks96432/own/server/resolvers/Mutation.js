const Mutation = {
	createMessage: async (parent, { data }, { Message, pubsub }) => {
		const message = new Message(data);
		await message.save();
		pubsub.publish(`with ${data.from}`, {
			messagesWith: { mutation: "CREATED", data: [message] },
		});
		if (data.from !== data.to)
			pubsub.publish(`with ${data.to}`, {
				messagesWith: { mutation: "CREATED", data: [message] },
			});
		return [message];
	},
	deleteMessages: async (parent, { data }, { Message, pubsub }) => {
		const messages = await Message.find({ $or: [{ from: data.name }, { to: data.name }] });
		await Message.deleteMany({ $or: [{ from: data.name }, { to: data.name }] });
		pubsub.publish(`with ${data.name}`, {
			messagesWith: { mutation: "DELETED", data: messages },
		});
		for (let message of messages)
			pubsub.publish(`with ${message.to === data.name ? message.from : message.to}`, {
				messagesWith: { mutation: "DELETED", data: [message] },
			});
		return messages;
	},
};

module.exports = Mutation;
