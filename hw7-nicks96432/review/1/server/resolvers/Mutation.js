
const Mutation = {

  async createMessage(parent, args, {Message,pubsub}, info) {
    const{name,body} = args.data
    const newMsg = new Message({name, body})
    await newMsg.save();
    console.log(newMsg)
    pubsub.publish("message", {
      message: {
        mutation: 'CREATED',
        data: newMsg
      }
    })
    return newMsg
  },
  async updateMessage(parent, args, {Message,pubsub}, info) {
    const{id, data} = args
    const message = await Message.findByIdAndUpdate(id, data,{new: true})
    if(!message) {
      console.error('Message not found')
    }
    pubsub.publish("message", {
      message: {
        mutation: 'UPDATED',
        data: message
      }
    })
    return message
  },
  async deleteMessage(parent, {id}, {Message,pubsub}, info){
    const deleteMsg = await Message.findById(id)
    Message.findByIdAndDelete(id,(err)=>{
      if(err){
        console.error(err)
      }
      else{
        console.log("successful deletion")
      }
    }) 
    pubsub.publish("message", {
      message: {
        mutation: 'DELETED',
        data: deleteMsg
      }
    })
    return deleteMsg
    
  }

}

export { Mutation as default }
