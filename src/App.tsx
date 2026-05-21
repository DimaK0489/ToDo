import { useState } from "react";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { authentication } from "./common/helpers";
import { Registration } from "./pages/Registration/Registration";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./common/routes";

function App() {
  const [isAuth, setIsAuth] = useState(authentication);

  const loginSuccess = () => {
    setIsAuth(true);
  };

  const logoutSuccess = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuth ? (
            <HomePage onLogOut={logoutSuccess} />
          ) : (
            <LoginPage onLoginSuccess={loginSuccess} />
          )
        }
      />
      <Route
        path={ROUTES.login}
        element={<LoginPage onLoginSuccess={loginSuccess} />}
      />
      <Route path={ROUTES.registration} element={<Registration />} />
    </Routes>
  );
}

export default App;
