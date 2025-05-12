import classNames from "classnames";
// eslint-disable-next-line @stylistic/js/max-len
import { getLayoutRightPanelWidth } from "entities/Layout/model/selectors/getLayoutRightPanelWidth/getLayoutRightPanelWidth";
import { useSelector } from "react-redux";
import { ButtonIcon } from "shared/ui/ButtonIcon/ButtonIcon";
import cls from "./Actions.module.scss";

interface IActionsProps {
  className?: string;
  handleUndoMove: () => void;
  handleRedoMove: () => void;
  selectedId: string | null;
  setScale: (scale: number) => void;
  scale: number;
}

export const Actions = ({ className, handleUndoMove, handleRedoMove, selectedId, setScale, scale }: IActionsProps) => {
  const reduxWidth = useSelector(getLayoutRightPanelWidth);

  return (
    <div style={{ right: `${16 + reduxWidth}px` }} className={classNames(cls.Actions, {}, [className])}>
      <div style={{display: 'flex'}}>
        <ButtonIcon 
          onClick={handleUndoMove} 
          disabled={!selectedId} 
          size="medium"
          style={{marginRight: 6}}
        >
          ↶
        </ButtonIcon>
        <ButtonIcon 
          onClick={handleRedoMove} 
          disabled={!selectedId} 
          size="medium"
        >
          ↷
        </ButtonIcon>
      </div>
      <ButtonIcon 
        disabled={Math.floor(scale) >= 3} 
        onClick={() => document.documentElement.requestFullscreen()} 
        size="medium"
      >
        ⇔
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
