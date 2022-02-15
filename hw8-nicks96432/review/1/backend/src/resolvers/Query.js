const Query = {
  async messages(parent, args, { Message }, info) {
    const res = await Message.find({
      $or: [{ from: args.user }, { to: args.user }],
    })
      .sort({ _id: 1 })
      .exec();
    return res;
  },
};

export { Query as default };
