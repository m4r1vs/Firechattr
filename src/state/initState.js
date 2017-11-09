import { firestore } from './firebase';

const initState = chatStore => {

	firestore
		.collection('messages')
		.onSnapshot((snapshot) => {
			snapshot.docChanges.forEach((docChange) => {
				switch (docChange.type) {
					case 'added':
            chatStore.addMessage(docChange.doc.id, docChange.doc.data());
						break;
					default:
						console.error('Can not remove or modify messages yet!');
						break;
				}
			});
		});
};

export default initState;