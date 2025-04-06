import classNames from "classnames";
import cls from "./ActionButton.module.scss";

interface IActionButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const ActionButton = ({ className, onClick, children }: IActionButtonProps) => {
  return (
    <button className={classNames(cls.ActionButton, {}, [className])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
