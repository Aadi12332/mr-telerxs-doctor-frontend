import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);

export const sendMessage = async (text:any, chatId:any, senderId:any) => {
  // await addDoc(collection(db, "messages"), {
  //   text,
  //   chatId,
  //   senderId,
  //   createdAt: serverTimestamp()
  // });
      await addDoc(
        collection(db, "tickets", chatId, "messages"),
        {
          text,
          senderId: senderId,
          senderRole: "admin",
          name: "Admin",
          createdAt: serverTimestamp(),
        }
      );
  
};

export const subscribeMessages = (chatId:any, callback:any) => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    orderBy("createdAt")
  );

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(msgs);
  });
};