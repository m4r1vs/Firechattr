import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import { observer } from 'preact-mobx';
import { firestore } from '../../state/firebase';

import style from './style';

@observer
export default class Home extends Component {

	sendMessage(e) {
		e.preventDefault();

		const content = this.chatBox.value;

		firestore
			.collection('messages')
			.doc()
			.set({
				content,
				timestamp: new Date()
			})
			.then(() => {

			})
			.catch(err => alert('Error sending message: ', err));
	}

	render({ chatStore }) {
		return (
			<div class={style.home}>
				<h1>FireChattr</h1>
				{chatStore.messages && chatStore.messages.map(msg => (
					<Card key={msg.id}>
						<Card.Primary>
							<Card.Title>
								{msg.content}
							</Card.Title>
							<Card.Subtitle>
								{msg.timestamp.toLocaleTimeString()}
							</Card.Subtitle>
						</Card.Primary>
					</Card>
				))}
				<form onSubmit={this.sendMessage.bind(this)}>
					<input type="text" placeholder="your message" ref={(el) => this.chatBox = el} />
					<input type="submit" value="Send" />
				</form>
			</div>
		);
	}
}
