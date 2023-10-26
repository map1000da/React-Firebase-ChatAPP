import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import SignOut from "./SignOut";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
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
    const fetchData = async () => {
      const dataQuery = query(
        collection(db, "messages"),
        orderBy("createdAt"),
        limit(50)
      );
      const dataSnapshot = await getDocs(dataQuery);
      //Firebaseから取得したデータをマッピングする
      const dataList: Message[] = dataSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          photoURL: data.photoURL,
          uid: data.uid,
        };
      });
      console.log("datalist", dataList);
      setMessages(dataList);
      console.log("message", messages);
    };

    fetchData();
  }, []);

  return (
    <div>
      <SignOut />
      <div className="mesgs">
        {messages.map(({ id, text, photoURL, uid }) => (
          <div>
            <div key={id}>
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
