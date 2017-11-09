import { observable, action } from 'mobx';

class Message {
  @observable id
  @observable content
  @observable timestamp

  constructor(id, message) {
  	this.id = id;
  	this.content = message.content;
  	this.timestamp = message.timestamp;
  }
}

class ChatStore {
  @observable messages = [];

  @action addMessage(id, message) {
  	this.messages.push(
  		new Message(id, message)
  	);
  }
}

export default new ChatStore();