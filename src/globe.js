import "./styles.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const projectId = "d-visualization";
const apiKey = "AIzaSyDrcWy8M7iOLUKaMnLdZ-7VlTh1fo2rXLY";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "690346321147",
  appId: "1:690346321147:web:430e64327b726a57973c5e",
  measurementId: "G-CFK57K7QWH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
const getCities = (db) => async () => {
  const arr = [];
  const citiesCol = await collection(db, "Transactions");
  console.log(citiesCol);
  const citySnapshot = await getDocs(citiesCol);
  citySnapshot.forEach((item) => {
    arr.push(item.data());
  });
  return arr;
};
const getTranactions = getCities(db);
export { getTranactions };
