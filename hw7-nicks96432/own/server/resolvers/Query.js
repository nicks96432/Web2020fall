const Query = {
	messages: async (parent, args, { Message }) => await Message.find().sort({ _id: 1 }),
	messagesFrom: async (parent, { name }, { Message }) =>
		await Message.find({ name }).sort({ _id: 1 }),
};

export default Query;
