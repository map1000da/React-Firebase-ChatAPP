import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import SignOut from "./SignOut";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import SendMessage from "./SendMessage";

type Message = {
  id: string;
  text: string;
  createdAt: Date;
  photoURL: string;
  uid: string;
};

const Line: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  //ページのレンダリング時だけmessagesをDBから持ってくる．
  useEffect(() => {
    const messageRef = collection(db, "messages");
    const dataQuery = query(messageRef, orderBy("createdAt"), limit(50));

    const unsub = onSnapshot(dataQuery, (QuerySnapshot) => {
      setMessages(
        QuerySnapshot.docs.map((doc) => {
          const data = doc.data();
          //console.log("取得データ;", data);
          return {
            id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate(),
            photoURL: data.photoURL,
            uid: data.uid,
          };
        })
      );
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      <SignOut />
      <div className="msgs">
        {messages.map(({ id, text, createdAt, photoURL, uid }) => (
          <div>
            <div
              key={id}
              className={`msg ${
                uid === auth.currentUser?.uid ? "sent" : "received"
              }`}
            >
              <img src={photoURL} alt="" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage />
    </div>
  );
};

export default Line;
