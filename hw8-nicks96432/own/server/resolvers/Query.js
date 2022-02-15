const Query = {
	messagesTo: async (parent, { to }, { Message }) =>
		await Message.find({ to }).sort({
			_id: 1,
		}),

	messagesWith: async (parent, { name }, { Message }) =>
		await Message.find({ $or: [{ from: name }, { to: name }] }).sort({ _id: 1 }),

	messages: async (parent, args, { Message }) =>
		await Message.find().sort({
			_id: 1,
		}),
};

module.exports = Query;
