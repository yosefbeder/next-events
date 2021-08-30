const transformToArray = <
  T extends { [key: string]: { [key: string]: string } },
>(
  obj: T,
) => {
  const result = [];

  for (const key in obj) {
    const id = key;
    result.push({ id, ...obj[id] });
  }

  return result;
};

export default transformToArray;
