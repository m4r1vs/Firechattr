const firebase = require('firebase');
require('firebase/firestore');

const config = {
	apiKey: 'AIzaSyAgbXVWT0iLVbiVF22YLkRIpPlOlGFIy38',
	authDomain: 'firechattr.firebaseapp.com',
	databaseURL: 'https://firechattr.firebaseio.com',
	projectId: 'firechattr',
	storageBucket: 'firechattr.appspot.com',
	messagingSenderId: '371318307365'
};

firebase.initializeApp(config);

export default firebase;
export const firestore = firebase.firestore();