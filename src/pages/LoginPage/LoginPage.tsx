import { useState, type SubmitEvent } from "react";
import { AuthAPI } from "../../api/instance";
import { Header } from "../../components/Header/Header";
import { showAlertError } from "../../helpers";
import s from "./LoginPage.module.css";

interface Props {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await AuthAPI.login({ email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      onLoginSuccess();
      alert("Authorization successful");
    } catch (error) {
      console.error(error);
      showAlertError(error, "Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Header title="Sign In" />
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
          />
          <button className={s.submitBtn} disabled={isLoading}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
