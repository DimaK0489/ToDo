import { useState, type SubmitEvent } from "react";
import { Header } from "../../components/Header/Header";
import s from "./Registration.module.css";
import { AuthAPI } from "../../api/instance";
import { showAlertError } from "../../common/helpers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/routes";

export const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthAPI.registration({
        email,
        password,
        userName,
      });
      navigate(ROUTES.login);
    } catch (error) {
      console.error(error);
      showAlertError(error, "Error registration!");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Header
          title="Registration"
          btnName="Login"
          onBtnClick={() => navigate(ROUTES.login)}
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
          <label htmlFor="name" className={s.label}>
            Name
          </label>
          <input
            className={s.input}
            id="name"
            type="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <button type="submit" className={s.submitBtn} disabled={isLoading}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
