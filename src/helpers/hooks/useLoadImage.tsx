import { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export function useLoadImage(
  imageSrc: string | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layerRef: React.RefObject<any>
) {
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [imagePosition, setImagePosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!imageSrc) {
      setImageObj(null);
      return;
    }

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setImageObj(img);

      const stage = layerRef.current?.parent;
      if (!stage) return;

      const scale = stage.scaleX(); // предполагаем, scaleX == scaleY
      const position = stage.position();
      const containerSize = {
        width: stage.width(),
        height: stage.height(),
      };

      const worldCenterX = (containerSize.width / 2 - position.x) / scale;
      const worldCenterY = (containerSize.height / 2 - position.y) / scale;

      const x = worldCenterX - img.width / 2;
      const y = worldCenterY - img.height / 2;

      setImagePosition({ x, y });
    };

    return () => {
      setImageObj(null);
      setImagePosition(null);
    };
  }, [imageSrc, layerRef]);

  return { imageObj, imagePosition };
}
