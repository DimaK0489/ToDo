import { useState, type SubmitEvent } from "react";
import { Header } from "../../components/Header/Header";
import s from "./Registration.module.css";
import { AuthAPI } from "../../api/instance";
import { showAlertError } from "../../common/helpers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/routes";

export const Registration = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number | "">("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthAPI.registration({
        username,
        email,
        password,
        gender,
        age: Number(age),
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
          <label htmlFor="userName" className={s.label}>
            UserName
          </label>
          <input
            className={s.input}
            type="userName"
            id="userName"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
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
          <label htmlFor="gender" className={s.label}>
            Gender
          </label>
          <select
            className={s.select}
            name=""
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
          >
            <option className={s.option} value="male">
              Male
            </option>
            <option className={s.option} value="female">
              Female
            </option>
          </select>
          <label htmlFor="age" className={s.label}>
            Age
          </label>
          <input
            className={s.input}
            id="age"
            type="age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="33"
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
