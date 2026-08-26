// firebase-config.js
// Shared Firebase init, imported by index.html, chat.html, and banned.html.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ---------------------------------------------------------------
// REPLACE THIS with your own project's config.
// Firebase console -> Project settings -> General -> Your apps -> SDK setup and config
// ---------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBSIvKsXaGc6JZHgYODA1riDC-fEWKvwh8",
  authDomain: "chat-dc403.firebaseapp.com",
  databaseURL: "https://chat-dc403-default-rtdb.firebaseio.com",
  projectId: "chat-dc403",
  storageBucket: "chat-dc403.firebasestorage.app",
  messagingSenderId: "768515931364",
  appId: "1:768515931364:web:d2434f2d81cd1b844340f1",
  measurementId: "G-2V32RPG9G6"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// The one account that gets moderator powers (delete messages, ban users).
export const ADMIN_EMAIL = "am1onionyt@gmail.com";
