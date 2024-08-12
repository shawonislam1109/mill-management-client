export const convertToLabel = (data, la, va) => {
  const convertToLabelData = data?.reduce((acc, curr) => {
    if (curr && la && va) {
      acc.push({ label: curr[la], value: curr[va] });
    }
    return acc;
  }, []);

  return convertToLabelData;
};

// Add convertToLabel to Array.prototype
Array.prototype.convertToLabel = function (la, va) {
  return this.reduce((acc, curr) => {
    if (curr && la && va) {
      acc.push({ label: curr[la], value: curr[va] });
    }
    return acc;
  }, []);
};
