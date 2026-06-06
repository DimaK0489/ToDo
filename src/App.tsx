import { useQueryClient } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./common/routes";
import { Loading } from "./components/Loading/Loading";
import { useAuthMe } from "./hooks/useAuthMe";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Registration } from "./pages/Registration/Registration";

function App() {
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, refetch } = useAuthMe();

  const loginSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["authMe"] });
    refetch();
  };

  const logoutSuccess = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["authMe"], null);
    queryClient.invalidateQueries({ queryKey: ["authMe"] });
  };

  if (isLoading && !!localStorage.getItem("token")) {
    return <Loading />;
  }

  const isAuthenticated = !!localStorage.getItem("token") && isSuccess;

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
