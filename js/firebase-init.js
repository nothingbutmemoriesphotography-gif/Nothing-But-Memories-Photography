// Firebase initialization for hosting and storage
// This file uses the Firebase JS SDK via CDN imports.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDV2CNUB0FPHbQlVdbJzt_sAuoED2WhYo8",
  authDomain: "nothingbutmemoriesphotog-2d68c.firebaseapp.com",
  projectId: "nothingbutmemoriesphotog-2d68c",
  storageBucket: "nothingbutmemoriesphotog-2d68c.firebasestorage.app",
  messagingSenderId: "477761454284",
  appId: "1:477761454284:web:f494adc66825c1bd5e4269",
  measurementId: "G-FB0BKTMNKF"
};

const app = initializeApp(firebaseConfig);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn('Firebase analytics not available:', error);
}

const storage = getStorage(app);

export { app, analytics, storage };
