import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1JaupyMY3C1LJ8Kdyoy967sWq-uvVhqE",
  authDomain: "predictram-web.firebaseapp.com",
  projectId: "predictram-web",
  storageBucket: "predictram-web.appspot.com",
  messagingSenderId: "486089959451",
  appId: "1:486089959451:web:1d95f7755ff4ff5b6d30be",
  measurementId: "G-R99MQ65D4C",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
