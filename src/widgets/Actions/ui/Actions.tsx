import classNames from "classnames";
import { ButtonIcon } from "shared/ui/ButtonIcon/ButtonIcon";
import cls from "./Actions.module.scss";

interface IActionsProps {
  className?: string;
  handleUndoMove: () => void;
  selectedId: string | null;
  setScale: (scale: number) => void;
  scale: number;
}

export const Actions = ({ className, handleUndoMove, selectedId, setScale, scale }: IActionsProps) => {
  return (
    <div className={classNames(cls.Actions, {}, [className])}>
      <ButtonIcon 
        onClick={handleUndoMove} 
        disabled={!selectedId} 
        size="medium"
      >
        ↶
      </ButtonIcon>
      <ButtonIcon 
        disabled={Math.floor(scale) >= 3} 
        onClick={() => setScale(scale + 0.1)} 
        size="medium"
      >
        +
      </ButtonIcon>
      <ButtonIcon 
        disabled={Math.floor(scale) <= 0.1} 
        onClick={() => setScale(scale - 0.1)} 
        size="medium"
      >
        -
      </ButtonIcon>
    </div>
  );
};
