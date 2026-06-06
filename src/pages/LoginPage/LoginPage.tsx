import { useState, type SubmitEvent } from "react";
import { AuthAPI } from "../../api/instance";
import { Header } from "../../components/Header/Header";
import { showAlertError } from "../../common/helpers";
import s from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/routes";

interface Props {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("dim0489@mail.ru");
  const [password, setPassword] = useState("1qazZAQ!");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await AuthAPI.login({ email, password });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      onLoginSuccess();
      navigate("/");
    } catch (error) {
      console.error(error);
      showAlertError(error, "Error log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Header
          title="Sign In"
          btnName="Registration"
          onBtnClick={() => navigate(ROUTES.registration)}
        />
        <form onSubmit={handleSubmit} className={s.form}>
          <label htmlFor="email" className={s.label}>
            Email
          </label>
          <input
            className={s.input}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className={s.label}>
            Password
          </label>
          <input
            className={s.input}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={s.submitBtn} disabled={isLoading}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
