const Subscription = {
	messagesWith: {
		subscribe: (parent, { name }, { pubsub }) => {
			return pubsub.asyncIterator(`with ${name}`);
		},
	},
};

module.exports = Subscription;
