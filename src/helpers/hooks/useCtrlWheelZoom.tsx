import { useEffect } from "react";

interface UseCtrlWheelZoomProps {
    scale: number;
    setScale: (newScale: number) => void;
    minScale?: number;
    maxScale?: number;
    scaleStep?: number;
}

export function useCtrlWheelZoom({
    scale,
    setScale,
    minScale = 0.1,
    maxScale = 3,
    scaleStep = 1.1,
}: UseCtrlWheelZoomProps) {
    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (!event.ctrlKey) return; // Проверяем, зажат ли Ctrl

            event.preventDefault();

            const newScale = event.deltaY > 0 ? scale / scaleStep : scale * scaleStep;

            if (newScale >= minScale && newScale <= maxScale) {
                setScale(newScale);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [scale, setScale, minScale, maxScale, scaleStep]);
}
