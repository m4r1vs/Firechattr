import { h, Component } from 'preact';
import Toolbar from 'preact-material-components/Toolbar';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Toolbar/style.css';
export default class Header extends Component {

	render() {
		return (
			<div>
				<Toolbar className="toolbar">
					<Toolbar.Row>
						<Toolbar.Section align-start={true}>
							<Toolbar.Title>
								FireChattr 🔥
							</Toolbar.Title>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
			</div>
		);
	}
}
