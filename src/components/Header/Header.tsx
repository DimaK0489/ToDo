import s from "./Header.module.css";

interface Props {
  title: string;
  btnName: string;
  onBtnClick?: () => void;
}

export const Header = ({ title, onBtnClick, btnName }: Props) => {
  return (
    <header className={s.header}>
      <h1 className={s.headerTitle}>{title}</h1>
      <nav className={s.nav}>
        <button onClick={onBtnClick} className={s.logoutBtn}>
          {btnName}
        </button>
      </nav>
    </header>
  );
};
