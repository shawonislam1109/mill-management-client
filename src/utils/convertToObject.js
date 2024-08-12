export const convertToObject = (data, key) => {
  const objectData = data?.reduce((acc, curr) => {
    if (curr) {
      acc = { ...acc, [curr[key]]: curr };
    }
    return acc;
  }, []);
  return objectData;
};
