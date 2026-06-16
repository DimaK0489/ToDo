import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { showAlertError } from "../../common/helpers";
import { ROUTES } from "../../common/routes";
import { Header } from "../../components/Header/Header";
import { useLoginMutation } from "../../services/todoApi";
import s from "./LoginPage.module.css";

interface Props {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: Props) => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("dim0489@mail.ru");
  const [password, setPassword] = useState("1qazZAQ!");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      const token = response.access_token;
      localStorage.setItem("token", token);
      onLoginSuccess();
      navigate("/");
    } catch (error) {
      console.error(error);
      showAlertError(error, "Error log in");
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
