import { Button } from "@mui/material";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import CallIcon from "@mui/icons-material/Call";

const SignOut: React.FC = () => {
  return (
    <div className="header">
      <Button
        onClick={() => signOut(auth)}
        style={{ color: "white", fontSize: "15px" }}
      >
        サインアウト
      </Button>
      <h3>{auth.currentUser?.displayName}</h3>
      <CallIcon />
    </div>
  );
};

export default SignOut;
