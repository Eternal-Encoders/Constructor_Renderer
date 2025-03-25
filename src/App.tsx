import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import classNames from 'classnames';
import { ActionType } from 'entities/Figure/Action';
import { FigureType, Polygon, Rectangle } from 'entities/Figure/Figure';
import { useCallback, useEffect, useState } from 'react';
import { ActionButton } from 'shared/ui/ActionButton/ActionButton';
import { Select } from 'shared/ui/Select/Select';
import { Canvas } from 'widgets/Canvas';
import { Navbar } from 'widgets/Navbar';
import { ObjectPalette } from 'widgets/ObjectPalette';

function App() {
  const { theme } = useTheme();

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<FigureType>(FigureType.None);
  const [selectedAction, setSelectedAction] = useState<ActionType>(ActionType.Cursor);
  const [scale, setScale] = useState<number>(1);

  const handleUndoMove = useCallback(() => {
    if (!selectedId) return;

    // Проверяем, принадлежит ли фигура прямоугольникам или полигонам
    const isRectangle = rectangles.some((fig) => fig.id === selectedId);
    const isPolygon = polygons.some((fig) => fig.id === selectedId);

    if (!isRectangle && !isPolygon) return;

    if (isPolygon) {
      setPolygons((prev) =>
        prev.map((fig) => {
          if (fig.id === selectedId && fig.history.length > 1) {
            const newHistory = [...fig.history];
            newHistory.pop();
            return { ...fig, points: newHistory[newHistory.length - 1].points, history: newHistory };
          }
          return fig;
        })
      );
    } else if (isRectangle) {
      setRectangles((prev) =>
        prev.map((fig) => {
          if (fig.id === selectedId && fig.history.length > 0) {
            const lastPosition = fig.history[fig.history.length - 1];
            return {
              ...fig,
              x: lastPosition.x,
              y: lastPosition.y,
              history: fig.history.slice(0, -1),
            };
          }
          return fig;
        })
      );
    }
  }, [selectedId, rectangles, setRectangles, polygons, setPolygons]);


  const handleDelete = () => {
    if (!selectedId) return;
    if (polygons.some((fig) => fig.id === selectedId)) {
      setPolygons((prev) => prev.filter((fig) => fig.id !== selectedId));
    } else if (rectangles.some((fig) => fig.id === selectedId)) {
      setRectangles((prev) => prev.filter((fig) => fig.id !== selectedId));
    }
    setSelectedId(null);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    if (event.keyCode === 46 && selectedId) handleDelete();
    else if (event.keyCode === 86) {
      setSelectedAction(ActionType.Cursor);
      setSelectedFigure(FigureType.None);
    } else if (event.keyCode === 82) {
      setSelectedFigure(FigureType.Rectangle);
      setSelectedAction(ActionType.None);
    } else if (event.keyCode === 80) {
      setSelectedFigure(FigureType.Polygon);
      setSelectedAction(ActionType.None);
    } else if (event.keyCode === 32) {
      setSelectedAction(ActionType.Drag);
      setSelectedFigure(FigureType.None);
    }
  }, [selectedId, setSelectedFigure, handleUndoMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={classNames(`app ${theme} noselect`)}>
      <Navbar marginBottom={12} />в
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
          setPolygons={setPolygons}
          polygons={polygons}
          setRectangles={setRectangles}
          rectangles={rectangles}
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
