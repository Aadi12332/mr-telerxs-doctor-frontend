import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBt09vfwSxJlLsOa-unhY-hwNpdZbA8-Vs",
//   authDomain: "telerxs-project.firebaseapp.com",
//   projectId: "telerxs-project",
//   storageBucket: "telerxs-project.firebasestorage.app",
//   messagingSenderId: "167238918517",
//   appId: "1:167238918517:web:99077ebebc97ee3f19f33c",
//   measurementId: "G-DGH996ZLCR"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBKzYrRCFzdWp-chqMJiAVadZllFrJYvrc",
  authDomain: "telerxs.firebaseapp.com",
  projectId: "telerxs",
  storageBucket: "telerxs.firebasestorage.app",
  messagingSenderId: "593006789549",
  appId: "1:593006789549:web:5e189a45413479641a1724"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };