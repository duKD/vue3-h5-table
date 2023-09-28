export const pxtorem = (x: number, rootValue: number) => {
  return x / rootValue + "rem";
};

export const cellSize = (size: number, rootValue: number) => {
  return pxtorem(size, rootValue);
};
