import "./App.css";
import SignIn from "./components/SignIn";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Line from "./components/Line";

const App = () => {
  // 認証状態
  const [user, loading, error] = useAuthState(auth);

  return <div className="App">{user ? <Line /> : <SignIn />}</div>;
};
export default App;
