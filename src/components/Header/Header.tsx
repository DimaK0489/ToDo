import s from "./Header.module.css";

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <header className={s.header}>
      <h1 className={s.headerTitle}>{title}</h1>
    </header>
  );
};
