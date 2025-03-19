import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import classNames from 'classnames';
import { ActionType } from 'entities/Figure/Action';
import { Figure, FigureType } from 'entities/Figure/Figure';
import { useCallback, useEffect, useState } from 'react';
import { ActionButton } from 'shared/ui/ActionButton/ActionButton';
import { Select } from 'shared/ui/Select/Select';
import { Canvas } from 'widgets/Canvas';
import { Navbar } from 'widgets/Navbar';
import { ObjectPalette } from 'widgets/ObjectPalette';

function App() {
  const { theme } = useTheme();

  const [figures, setFigures] = useState<Figure[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<FigureType | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionType>(ActionType.Cursor);
  const [scale, setScale] = useState<number>(1);

  const handleUndoMove = useCallback(() => {
    if (!selectedId || !figures.some(fig => fig.id === selectedId)) return;

    setFigures((prev) =>
      prev.map((fig) => {
        if (fig.id === selectedId && fig.history.length > 1) {
          const newHistory = [...fig.history];
          newHistory.pop();
          const { x, y } = newHistory[newHistory.length - 1];
          return { ...fig, x, y, history: newHistory };
        }
        return fig;
      })
    );
  }, [selectedId, figures, setFigures]);

  const handleDelete = () => {
    if (!selectedId) return;
    setFigures((prev) => prev.filter((fig) => fig.id !== selectedId));
    setSelectedId(null);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 46 && selectedId) handleDelete();
    else if (event.ctrlKey && event.keyCode === 90) {
      event.preventDefault();
      handleUndoMove();
    } else if (event.keyCode === 86) {
      setSelectedFigure(null);
    } else if (event.keyCode === 82) {
      setSelectedFigure(FigureType.Rectangle);
    } else if (event.keyCode === 76) {
      setSelectedFigure(FigureType.DottedLine);
    }
  }, [selectedId, setSelectedFigure, handleUndoMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={classNames(`app ${theme} noselect`)}>
      <Navbar marginBottom={12} />
      <div className={classNames(`content-page`)}>
        <AppRouter />
        <ObjectPalette setSelectedAction={setSelectedAction} selectedAction={selectedAction} setSelectedFigure={setSelectedFigure} selectedFigure={selectedFigure}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 10, gap: 10 }}>
          <ActionButton selectedId={selectedId ?? undefined} onClick={() => handleUndoMove()}>Назад</ActionButton>
          <ActionButton className='red' selectedId={selectedId ?? undefined} onClick={() => handleDelete()}>🗑️ Удалить</ActionButton>
          <Select setScale={setScale} scale={scale} />
        </div>
        <Canvas
          scale={scale}
          setScale={setScale}
          setFigures={setFigures}
          figures={figures}
          selectedId={selectedId ?? undefined}
          selectedFigure={selectedFigure}
          selectedAction={selectedAction}
          setSelectedId={setSelectedId}
        />
      </div>
    </div>
  );
}

export default App;
