import classNames from "classnames";
import { ActionButton } from "shared/ui/ActionButton/ActionButton";
import { Select } from "shared/ui/Select/Select";
import cls from "./Actions.module.scss";

interface IActionsProps {
  className?: string;
  handleUndoMove: () => void;
  handleDelete: () => void;
  selectedId: string | null;
  setScale: (scale: number) => void;
  scale: number;
}

export const Actions = ({ className, handleUndoMove, handleDelete, selectedId, setScale, scale }: IActionsProps) => {
  return (
    <div className={classNames(cls.Actions, {}, [className])}>
      <ActionButton selectedId={selectedId ?? undefined} onClick={handleUndoMove}>
        Назад
      </ActionButton>
      <ActionButton 
        className='red' 
        selectedId={selectedId ?? undefined} 
        onClick={() => handleDelete()}>
        🗑️ Удалить
      </ActionButton>
      <Select setScale={setScale} scale={scale} />
    </div>
  );
};
