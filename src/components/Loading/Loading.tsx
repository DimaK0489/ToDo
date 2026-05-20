import s from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={s.container}>
      <div className={s.spinner}></div>
      <p className={s.text}>Loading...</p>
    </div>
  );
};
