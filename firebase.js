// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpaf3wdXkypPKH443SIZcJRFiz02s-t30",
  authDomain: "liaread.firebaseapp.com",
  projectId: "liaread",
  storageBucket: "liaread.firebasestorage.app",
  messagingSenderId: "951394019167",
  appId: "1:951394019167:web:86825d5ebff4d77807f8ea",
  measurementId: "G-63JN91LVV6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
