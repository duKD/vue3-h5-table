let rmSize: number | undefined = undefined;

export const pxtorem = (x: number, multiplex: number) => {
  if (!rmSize) {
    rmSize = Number(document.documentElement.style.fontSize.replace("px", ""));
  }

  return x / rmSize / multiplex + "rem";
};

export const cellSize = (size: number | undefined, multiplex: number) => {
  if (!size) {
    return pxtorem(60, multiplex);
  }

  return pxtorem(size, multiplex);
};
