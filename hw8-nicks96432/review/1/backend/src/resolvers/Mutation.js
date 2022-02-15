import uuidv4 from "uuid/v4";

const Mutation = {
  async createMessage(parent, args, { Message, pubsub }, info) {
    await Message.insertMany([args.data]);
    pubsub.publish(`user ${args.data.from}`, {
      message: {
        mutation: "CREATED",
        data: args.data,
      },
    });
    pubsub.publish(`user ${args.data.to}`, {
      message: {
        mutation: "CREATED",
        data: args.data,
      },
    });

    return args.data;
  },
};

export { Mutation as default };
