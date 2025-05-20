import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrtXKpwWaY_7LSwyzeLrVdChb_IQrTL7s",
  authDomain: "predictam-web.firebaseapp.com",
  projectId: "predictam-web",
  storageBucket: "predictam-web.firebasestorage.app",
  messagingSenderId: "663856511731",
  appId: "1:663856511731:web:a2a0a70e7c34d911d2d586",
  measurementId: "G-PS9W2CY8BE",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
