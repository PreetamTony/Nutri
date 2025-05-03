import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0-zs2pxpIIL6A09LJwEOXb3o2GkaBoPs",
  authDomain: "nutribot-e5c49.firebaseapp.com",
  projectId: "nutribot-e5c49",
  storageBucket: "nutribot-e5c49.firebasestorage.app",
  messagingSenderId: "538287567047",
  appId: "1:538287567047:web:10425c7d5a459baf950ee2",
  measurementId: "G-6J17LE7PDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Only initialize analytics and auth in the browser
function getAnalyticsIfSupported() {
  if (typeof window === 'undefined') return undefined;
  return isAnalyticsSupported().then(supported => supported ? getAnalytics(app) : undefined);
}

function getAuthIfSupported() {
  if (typeof window === 'undefined') return undefined;
  return getAuth(app);
}

export { app, db, getAnalyticsIfSupported as getAnalytics, getAuthIfSupported as getAuth };