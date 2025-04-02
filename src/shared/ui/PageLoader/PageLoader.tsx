import classNames from "classnames";
import cls from "./PageLoader.module.scss";

export const PageLoader = () => {
  return (
    <span className={classNames(cls.loader)}>

    </span>
  );
};
