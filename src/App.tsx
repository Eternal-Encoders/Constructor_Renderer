import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import classNames from 'classnames';
import { Figure, FigureType } from 'entities/Figure/Figure';
import { useEffect, useState } from 'react';
import { ActionButton } from 'shared/ui/ActionButton/ActionButton';
import { Canvas } from 'widgets/Canvas';
import { Navbar } from 'widgets/Navbar';
import { ObjectPalette } from 'widgets/ObjectPalette';

function App() {
  const { theme } = useTheme();

  const [figures, setFigures] = useState<Figure[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<FigureType | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: { keyCode: number; ctrlKey: boolean; preventDefault: () => void; }) => {
      // Key Del
      if (event.keyCode === 46 && selectedId) {
        handleDelete();
      }
      // Key Ctrl + Z
      else if (event.ctrlKey && event.keyCode === 90) {
        event.preventDefault(); // предотвращаем стандартное поведение
        handleUndoMove();
      }
      // Key V
      else if (event.keyCode === 86) {
        setSelectedFigure(null);
      }
      // Key R
      else if (event.keyCode === 82) {
        setSelectedFigure(FigureType.Rectangle);
      }
      // Key L
      else if (event.keyCode === 76) {
        setSelectedFigure(FigureType.DottedLine);
      }
    };
    // Добавляем слушатель события нажатия клавиш
    window.addEventListener('keydown', handleKeyDown);
    // Удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]); // Зависимость от selectedId

  const handleUndoMove = () => {
    if (!selectedId) return;
    setFigures((prev) =>
      prev.map((fig) => {
        if (fig.id === selectedId && fig.history.length > 1) {
          const newHistory = [...fig.history];
          newHistory.pop(); // Удаляем последний шаг
          const { x, y } = newHistory[newHistory.length - 1]; // Берём предыдущие координаты
          return { ...fig, x, y, history: newHistory };
        }
        return fig;
      })
    );
  };

  const handleDelete = () => {
    if (!selectedId) return;
    setFigures((prev) => prev.filter((fig) => fig.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div className={classNames(`app ${theme} noselect`)}>
      <Navbar marginBottom={12} />
      <div className={classNames(`content-page`)}>
        <AppRouter />
        <ObjectPalette setSelectedFigure={setSelectedFigure} selectedFigure={selectedFigure}
        />
        <ActionButton selectedId={selectedId ?? undefined} onClick={() => handleUndoMove()}>Назад</ActionButton>
        <ActionButton selectedId={selectedId ?? undefined} onClick={() => handleDelete()}>Удалить</ActionButton>
        <Canvas
          setFigures={setFigures}
          figures={figures}
          selectedId={selectedId ?? undefined}
          selectedFigure={selectedFigure}
          setSelectedId={setSelectedId}
        />
      </div>
    </div>
  );
}

export default App;
