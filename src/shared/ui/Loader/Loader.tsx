import classNames from "classnames";
import cls from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={cls.Loader}>
      <span className={classNames(cls.loader)}>
  
      </span>
    </div>
  );
};
