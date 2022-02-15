const Subscription = {
	message: {
		subscribe: async (parent, args, { pubsub }) => await pubsub.asyncIterator("message"),
	},
};

export default Subscription;
