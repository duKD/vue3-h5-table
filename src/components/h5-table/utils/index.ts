export const pxtorem = (x:number)=>{
    const rmSize = Number(document.documentElement.style.fontSize.replace('px',''))
    return x/rmSize/2 +'rem'
}

export const cpxtorem = (x:number)=>{
    const rmSize = Number(document.documentElement.style.fontSize.replace('px',''))
    return x/rmSize +'rem'
}

export const cellSize = (size: number | undefined) => {
    if (!size) {
      return pxtorem(60);
    }
    return pxtorem(size);
  };