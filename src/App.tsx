import { useState } from "react";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { authentication } from "./helpers";

function App() {
  const [isAuth, setIsAuth] = useState(authentication);

  const loginSuccess = () => {
    setIsAuth(true);
  };

  return (
    <div className="appContainer">
      {isAuth ? <HomePage /> : <LoginPage onLoginSuccess={loginSuccess} />}
    </div>
  );
}

export default App;
