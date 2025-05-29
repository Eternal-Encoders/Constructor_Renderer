import classNames from "classnames";
import cls from "./PageLoader.module.scss";

export const PageLoader = () => {
  return (
    <div className={classNames(cls.PageLoader)}>
      <span className={classNames(cls.loader)}>
  
      </span>
    </div>
  );
};
