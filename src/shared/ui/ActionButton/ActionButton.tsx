import classNames from "classnames";
import cls from "./ActionButton.module.scss";

interface IActionButtonProps {
    className?: string;
    selectedId?: string;
    onClick: () => void;
    children: React.ReactNode;
}

export const ActionButton = ({ className, selectedId, onClick, children }: IActionButtonProps) => {
    return (
        <button className={classNames(cls.ActionButton, (className === 'red' && selectedId) ? cls.ActionButton_red : undefined)}
            onClick={onClick}
            disabled={!selectedId}
        >
            {children}
        </button>
    );
};
