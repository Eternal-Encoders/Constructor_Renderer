import Konva from 'konva';
import { useState } from 'react';
import { Layer, Line, Rect, Stage } from 'react-konva';
import { EditorPanel } from './components/EditorPanel';

interface Figure {
  id: string;
  type: 'rectangle' | 'dottedLine';
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: number[];
  draggable: boolean;
  history: { x: number; y: number; }[];
}

function App() {
  const [figures, setFigures] = useState<Figure[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    <>
      <EditorPanel onAddFigure={handleAddFigure} />
      <button
        onClick={handleUndoMove}
        disabled={!selectedId}
        style={{ margin: '10px' }}
      >
        Отменить перемещение
      </button>
      <button
        onClick={handleDelete}
        disabled={!selectedId}
        style={{ margin: '10px', color: selectedId ? 'red' : 'gray' }}
      >
        🗑 Удалить
      </button>
      <div style={{ border: '1px solid black', width: '500px', height: '500px' }}>
        <Stage width={500} height={500} onClick={() => setSelectedId(null)}>
          <Layer>
            {figures.map((fig) =>
              fig.type === 'rectangle' ? (
                <Rect
                  key={fig.id}
                  x={fig.x}
                  y={fig.y}
                  width={fig.width}
                  height={fig.height}
                  fill={selectedId === fig.id ? 'lightblue' : '#00D2FF'}
                  stroke="black"
                  strokeWidth={2}
                  draggable
                  onClick={(e) => {
                    e.cancelBubble = true;
                    setSelectedId(fig.id);
                  }}
                  onDragMove={(e) => handleDragMove(fig.id, e)}
                  onDragEnd={(e) => handleDragEnd(fig.id, e)}
                />
              ) : (
                <Line
                  key={fig.id}
                  x={fig.x}
                  y={fig.y}
                  points={fig.points!}
                  stroke="black"
                  strokeWidth={2}
                  lineCap="round"
                  lineJoin="round"
                  dash={[10, 5]}
                  draggable
                  onClick={(e) => {
                    e.cancelBubble = true;
                    setSelectedId(fig.id);
                  }}
                  onDragMove={(e) => handleDragMove(fig.id, e)}
                  onDragEnd={(e) => handleDragEnd(fig.id, e)}
                />
              )
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
}

export default App;
