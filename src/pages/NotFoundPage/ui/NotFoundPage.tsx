import classNames from "classnames";
import cls from "./NotFoundPage.module.scss";

interface INotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: INotFoundPageProps) => {
  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
      Страница не найдена
    </div>
  );
};
