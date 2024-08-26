// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { getStorage, type FirebaseStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa5vDZtiMW2nJ5_pDkx4MZopxNiDKpStA",
  authDomain: "fitness-app-b1341.firebaseapp.com",
  databaseURL: "https://fitness-app-b1341-default-rtdb.firebaseio.com",
  projectId: "fitness-app-b1341",
  storageBucket: "fitness-app-b1341.appspot.com",
  messagingSenderId: "642738117496",
  appId: "1:642738117496:web:49a7190a9b00611637468d",
  measurementId: "G-KFSEJHZMDK"
};

let firebaseApp: FirebaseApp, firebaseAnalytics: Analytics, firebaseAuth: Auth, firebaseDB: Database, firebaseStorage: FirebaseStorage;
// Initialize Firebase

if (typeof window !== 'undefined') {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAnalytics = getAnalytics(firebaseApp);
  firebaseAuth = getAuth(firebaseApp);
  firebaseDB = getDatabase(firebaseApp);
  firebaseStorage = getStorage(firebaseApp);
}

export { firebaseApp, firebaseAnalytics, firebaseAuth, firebaseDB, firebaseStorage };
