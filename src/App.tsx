import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./common/routes";
import { Loading } from "./components/Loading/Loading";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Registration } from "./pages/Registration/Registration";
import { todoApi, useAuthMeQuery } from "./services/todoApi";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const { isLoading, isSuccess } = useAuthMeQuery(undefined, {
    skip: !token,
  });

  const loginSuccess = () => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  };

  const logoutSuccess = () => {
    localStorage.removeItem("token");
    setToken(null);
    dispatch(todoApi.util.resetApiState());
  };

  if (isLoading && !!token) {
    return <Loading />;
  }

  const isAuthenticated = !!token && isSuccess;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
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
