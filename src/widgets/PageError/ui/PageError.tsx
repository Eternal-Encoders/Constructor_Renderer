import classNames from "classnames";
import cls from "./PageError.module.scss";

interface IPageErrorProps {
  className?: string;
}

export const PageError = ({ className }: IPageErrorProps) => {

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>Произошла непредвиденная ошибка</p>
      <button onClick={reloadPage}>Обновить страницу</button>
    </div>
  );
};
