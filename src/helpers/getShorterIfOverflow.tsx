 
export const getShorterIfOverflow = (value: string, limit: number) => {
  return value.length > limit ? `${value.slice(0, limit)}...` : value
};