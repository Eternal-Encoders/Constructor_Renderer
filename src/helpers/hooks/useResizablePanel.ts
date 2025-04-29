import { useEffect, useRef, useState } from "react";

interface UseResizablePanelOptions {
  initialWidth: number;
  minWidth?: number;
  maxWidth?: number;
  onResize?: (newWidth: number) => void;
  direction?: "left" | "right";
}

export const useResizablePanel = ({
  initialWidth,
  minWidth = 240,
  maxWidth = 360,
  onResize,
  direction = "right",
}: UseResizablePanelOptions) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const widthRef = useRef(initialWidth);
  const animationFrameRef = useRef<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    widthRef.current = initialWidth;
    if (panelRef.current) {
      panelRef.current.style.width = `${initialWidth}px`;
    }
  }, [initialWidth]);

  const updateWidth = (width: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      onResize?.(width);
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startXRef.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !panelRef.current) return;

    const deltaX = e.clientX - startXRef.current;
    const adjustedDelta = direction === "left" ? deltaX : -deltaX;
    
    const newWidth = Math.min(
      Math.max(widthRef.current + adjustedDelta, minWidth),
      maxWidth
    );

    panelRef.current.style.width = `${newWidth}px`;
    updateWidth(newWidth);
  };

  const handleMouseUp = () => {
    if (!isResizing || !panelRef.current) return;

    const finalWidth = parseInt(panelRef.current.style.width, 10);
    widthRef.current = finalWidth;
    onResize?.(finalWidth);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isResizing]);

  return {
    panelRef,
    handleMouseDown,
  };
};
