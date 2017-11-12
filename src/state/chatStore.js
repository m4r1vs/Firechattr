import { observable, action, computed } from 'mobx';

class Message {
  @observable id
  @observable content
  @observable color
  @observable likes
  @observable timestamp

  constructor(id, message) {
  	this.id = id;
  	this.likes = message.likes ? message.likes : 1;
  	this.color = message.color ? message.color : '#006';
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

  @action editMessage(id, message) {
  	this.messages.forEach((msg, i) => {
  		if (msg.id === id) this.messages[i] = new Message(id, message);
  	});
  }

  @computed get orderedMessages() {
  	function compare(a, b) {
  		if (a.timestamp.getTime() > b.timestamp.getTime())
  			return -1;
  		if (a.timestamp.getTime() < b.timestamp.getTime())
  			return 1;
  		return 0;
  	}

  	return this.messages.sort(compare);
  }
}

export default new ChatStore();