import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//TODO vars in .env 

const firebaseConfig = {
    apiKey: "AIzaSyAqHNsx_70f6jRA1BNUuz1aWpLCjHQLEYk",
    authDomain: "mywiki-be670.firebaseapp.com",
    projectId: "mywiki-be670",
    storageBucket: "mywiki-be670.appspot.com",
    messagingSenderId: "309929430264",
    appId: "1:309929430264:web:b89d059b8a65aaf1c7bf0d",
    measurementId: "G-LXS16ECYK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
// const analytics = getAnalytics(app);