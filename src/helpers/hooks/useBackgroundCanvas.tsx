import { getFillHEXCode, getFillOpacity } from "entities/Fill";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useBackgroundCanvas = (stageRef: React.RefObject<any>) => {
  const bgcHEXCode = useSelector(getFillHEXCode);
  const bgOpacity = useSelector(getFillOpacity);

  // Set CSS background when component mounts
  useEffect(() => {
    if (stageRef.current) {
      // Apply CSS background to stage container
      const container = stageRef.current.container();
      container.style.backgroundColor = bgcHEXCode;
      container.style.opacity = bgOpacity;
    }
  }, [bgcHEXCode, bgOpacity, stageRef]);
}