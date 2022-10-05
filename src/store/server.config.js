import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpbci_k7iexny2BGitvzotDt9ovHOIVo0",
  authDomain: "avid-chatty.firebaseapp.com",
  projectId: "avid-chatty",
  storageBucket: "avid-chatty.appspot.com",
  messagingSenderId: "419005276273",
  appId: "1:419005276273:web:7faa8c0858620b6dbf7bd0",
  measurementId: "G-MGN47X8SBE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default getFirestore();