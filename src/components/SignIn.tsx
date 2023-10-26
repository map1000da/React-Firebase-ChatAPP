import { Button } from "@mui/material";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignIn: React.FC = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };
  return (
    <div>
      <div>
        <Button onClick={signInWithGoogle}> Googleでログインする</Button>
      </div>
    </div>
  );
};

export default SignIn;
