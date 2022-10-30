import { initializeApp } from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore"

// Setting up the application with my database-conectors credentials
const firebaseConfig = {
    apiKey: "AIzaSyDBZG0VlqTEWwPu5eHIStrFduStbGRQS0k",
    authDomain: "ani-store-coderhouse.firebaseapp.com",
    projectId: "ani-store-coderhouse",
    storageBucket: "ani-store-coderhouse.appspot.com",
    messagingSenderId: "476858888855",
    appId: "1:476858888855:web:705f52899831af2c082fd2"
};

export async function getProductsFromFirebase() {
    const productsCollection = collection(db, 'products')
    const productsSnapshot = await getDocs(productsCollection);

    return productsSnapshot.docs.map(doc => doc.data());
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);