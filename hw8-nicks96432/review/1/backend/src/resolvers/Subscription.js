const Subscription = {
  message: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator(`user ${args.user}`);
    },
  },
};

export { Subscription as default };
