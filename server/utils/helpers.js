export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const sanitizeValues = (values) => {
  return values.map((value) => {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  });
};
