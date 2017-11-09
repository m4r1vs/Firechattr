import './style';
import App from './components/app';
import ChatStore from './state/chatStore';

const Root = () => <App chatStore={ChatStore} />;

export default Root;
