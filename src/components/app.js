import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { observer } from 'preact-mobx';

import initState from '../state/initState';
import Header from './header';
import Home from '../routes/home';

@observer
export default class App extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	componentDidMount() {
		initState(this.props.chatStore);
	}

	render({ chatStore }) {
		return (
			<div id="app">
				<Header />
				<Router>
					<Home path="/" chatStore={chatStore} />
				</Router>
			</div>
		);
	}
}
