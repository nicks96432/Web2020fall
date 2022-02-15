
const Query = {
  async users(parent, args, { Message }, info) {
    const users=[]
    const Msgs = await Message.find()
      Msgs.map(msg=>{
        let user={
          id: msg._id,
          name: msg.name,
          postsbody: []
        }
        user.postsbody.push(msg.body)
        let index=users.findIndex(user=>user.name === msg.name)
        if(index===-1){
          users.push(user)
        }
        else{
          users[index].postsbody.push(msg.body)
        }
        
      })
    if (!args.query) {
      return users
    }

    return users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  messages(parent, args, {Message}, info){
    return Message.find()
  }
}

export { Query as default }
