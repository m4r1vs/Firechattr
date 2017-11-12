import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';

import { observer } from 'preact-mobx';
import { firestore } from '../../state/firebase';

import TextInput from '../../components/textInput';
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
				color: this.colorArray[this.state.newMsgColor],
				timestamp: new Date(),
				likes: 1
			})
			.then(() => {
				this.setState({ newMsgColor: Math.floor(Math.random() * this.colorArray.length) });
			})
			.catch(err => alert('Error sending message: ', err));
		
	}

	addFire(msg) {
		firestore
			.collection('messages')
			.doc(msg.id)
			.update({
				likes: msg.likes + 1
			});
	}

	constructor() {
		super();

		this.colorArray = [
			'#FF9908',
			'#06A3CB',
			'#DD5F5F',
			'#8ABDB0',
			'#9EC41C',
			'#dd5f9e',
			'#5fdd9e'
		];

		this.state = {
			newMsgColor: 0
		};
	}

	componentWillMount() {
		this.setState({ newMsgColor: Math.floor(Math.random() * this.colorArray.length)  });
		console.log(this.state.newMsgColor);
	}

	render({ chatStore }) {
		return (
			<div class={style.home}>
				<form onSubmit={this.sendMessage.bind(this)}>
					<TextInput color={this.colorArray[this.state.newMsgColor]} name="Your Message" inputRef={(el) => this.chatBox = el} required />
				</form>
				{chatStore.orderedMessages && chatStore.orderedMessages.map(msg => (
					<Card style={{ background: msg.color ? msg.color : '#008' }} className={style.card} key={msg.id}>
						<Card.Primary>
							<Card.Title style={{ color: '#fff', paddingRight: '72px', lineHeight: '1.3' }}>
								{msg.content}
							</Card.Title>
							<br />
							<Card.Subtitle style={{ color: '#fff' }}>
								{msg.timestamp.toLocaleTimeString()}, {msg.timestamp.toLocaleDateString()}
							</Card.Subtitle>
							<button onClick={() => this.addFire(msg)} class={style.like}>{msg.likes && msg.likes}🔥</button>
						</Card.Primary>
					</Card>
				))}
			</div>
		);
	}
}
