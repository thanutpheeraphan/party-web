import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
	apiKey: "AIzaSyAMWNDjnZdumILKeyAmAIrV0LTEnE9P4-M",
	authDomain: "partyweb-e6325.firebaseapp.com",
	projectId: "partyweb-e6325",
	storageBucket: "partyweb-e6325.appspot.com",
	messagingSenderId: "187687633715",
	appId: "1:187687633715:web:8f73999e5f8292da87f446",
	measurementId: "G-FBEXT31N7V"
  };


  export const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)

