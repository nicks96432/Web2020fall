require('dotenv-defaults').config()

const mongoose = require('mongoose')

const Message = require('./models/message')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

/////////////////////////////////
const { GraphQLServer, PubSub } = require('graphql-yoga')

const pubsub = new PubSub();

const typeDefs = `type Query {
  getMsg: [Message]
}
type Message {
  name: String!
  body: String!
}
type Mutation {
  addMsg(name: String!, body: String!): Message!
  deleteMsg(name: String!): String!
}
type Subscription {
  message: Message!
}`

const resolvers = {
  Query: {
    getMsg: async () => await Message.find(),
  },
  Mutation: {
    addMsg: async (parent, { name, body }, pubSub, info) => {
      const msg = new Message({ name, body });

      pubSub.publish('message', { message: msg });

      await msg.save();
      return msg;
    },
    deleteMsg: async (_, { name }) => {
      Message.deleteMany({ name }, () => { console.log("delete") });
      return "OK";
    }
  },
  Subscription: {
    message: {
      subscribe(_, args, pubSub, info) {
        return pubSub.asyncIterator('message');
      }
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers, context: pubsub })
//////////////////////////////////

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')

  const PORT = process.env.port || 4000

  server.start(() => console.log('Server is running on localhost:4000'))
})