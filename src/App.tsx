import Konva from 'konva';
import { useEffect, useRef } from 'react';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Создаём stage внутри useEffect
    const stage = new Konva.Stage({
      container: containerRef.current, // <div ref={containerRef}>
      width: 500,
      height: 500
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const circle = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });

    layer.add(circle);
    layer.draw();

    // Если вдруг захочешь почистить при размонтировании
    return () => {
      stage.destroy();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{ border: '1px solid black', height: '500px', width: '500px' }}
      >
        {/* Konva сам всё нарисует внутри */}
      </div>
    </>
  );
}

export default App;
