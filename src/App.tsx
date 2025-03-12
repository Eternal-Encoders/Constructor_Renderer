import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import classNames from 'classnames';
import { Figure } from 'entities/Figure/Figure';
import Konva from 'konva';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ActionButton } from 'shared/ui';
import { Canvas } from 'widgets/Canvas';
import { ObjectPalette } from 'widgets/ObjectPalette';

function App() {
  const { theme } = useTheme();

  const [figures, setFigures] = useState<Figure[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: { keyCode: number; ctrlKey: boolean; preventDefault: () => void; }) => {
      console.log(event);
      if (event.keyCode === 46 && selectedId) {
        handleDelete();
      }
      if (event.ctrlKey && event.keyCode === 90) {
        event.preventDefault(); // предотвращаем стандартное поведение
        handleUndoMove();
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

  const handleAddFigure = (type: 'rectangle' | 'dottedLine') => {
    const newFigure: Figure = {
      id: `${type}-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: type === 'rectangle' ? 100 : undefined,
      height: type === 'rectangle' ? 50 : undefined,
      points: type === 'dottedLine' ? [0, 0, 100, 0] : undefined,
      draggable: true,
      history: [{ x: 100, y: 100 }],
    };
    setFigures([...figures, newFigure]);
  };

  const handleDragMove = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    setFigures((prev) =>
      prev.map((fig) =>
        fig.id === id
          ? { ...fig, x: e.target.x(), y: e.target.y() }
          : fig
      )
    );
  };

  const handleDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    setFigures((prev) =>
      prev.map((fig) =>
        fig.id === id
          ? { ...fig, history: [...fig.history, { x: e.target.x(), y: e.target.y() }] }
          : fig
      )
    );
  };

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
    <div className={classNames(`app ${theme} noselect`)} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О сайте</Link>
      <AppRouter />
      <ObjectPalette onAddFigure={handleAddFigure} />
      <ActionButton selectedId={selectedId ?? undefined} onClick={() => handleUndoMove()}>Назад</ActionButton>
      <ActionButton selectedId={selectedId ?? undefined} onClick={() => handleDelete()}>Удалить</ActionButton>
      <Canvas
        figures={figures}
        selectedId={selectedId ?? undefined}
        handleDragMove={handleDragMove}
        handleDragEnd={handleDragEnd}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}

export default App;
