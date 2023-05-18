import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA_9yW96DxD1_7F2kvqdmzUB3VGw89jlsg",
	authDomain: "advance-gpt.firebaseapp.com",
	projectId: "advance-gpt",
	storageBucket: "advance-gpt.appspot.com",
	messagingSenderId: "305121057297",
	appId: "1:305121057297:web:21765a51bb4b20d7926fb0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
