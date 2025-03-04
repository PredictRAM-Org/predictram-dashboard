export const formatNumber = (num) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatKey = (key) => {
  return (
    key.charAt(0).toUpperCase() +
    key
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim()
  );
};

export const formatValue = (value) => {
  if (Array.isArray(value)) {
    return `[${value[0].toFixed(4)}, ${value[1].toFixed(4)}]`;
  } else if (typeof value === "number") {
    return value.toFixed(4);
  }
  return value;
};
