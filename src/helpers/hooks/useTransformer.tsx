import Konva from "konva";
import { useEffect, useRef } from "react";

export const useTransformer = (selectedId: string | undefined) => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const selectedNodeRef = useRef<Konva.Node | null>(null);
    
  // Добавление ссылок для трансформации
  useEffect(() => {
    if (transformerRef.current) {
      if (selectedId) {
        const selectedNode = selectedNodeRef.current;
        if (selectedNode) {
          transformerRef.current.nodes([selectedNode]);
          transformerRef.current.getLayer()?.batchDraw();
        }
      } else {
        transformerRef.current.nodes([]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }
  }, [selectedId]);

  return { transformerRef, selectedNodeRef };
}