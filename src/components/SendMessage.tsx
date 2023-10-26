import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Enterを押したときに再ロードすることがなくなる．

    const data = {
      text: message,
      createdAt: serverTimestamp(),
      photoURL: auth.currentUser?.photoURL,
      uid: auth.currentUser?.uid,
    };

    await addDoc(collection(db, "messages"), data);

    setMessage("");
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <Input
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder="メッセージを入力してください"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <SendIcon style={{ color: "#7AC2FF", marginLeft: "20px" }} />
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
