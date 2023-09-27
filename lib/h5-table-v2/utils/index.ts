export const pxtorem = (x: number, rootValue: number) => {
  return x / rootValue + "rem";
};

export const cellSize = (size: number | undefined, rootValue: number) => {
  if (!size) {
    return pxtorem(60, rootValue);
  }

  return pxtorem(size, rootValue);
};
