// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRelativePointerPosition = (stage: any, scale: number) => {
  const pointer = stage.getPointerPosition();
  if (!pointer) return null;

  const stagePos = stage.position();
  return {
    x: (pointer.x - stagePos.x) / scale,
    y: (pointer.y - stagePos.y) / scale
  };
};