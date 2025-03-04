export const mapToLabelValueArray = (optionsArr, key, value) => {
  const options = optionsArr.map((el) => {
    return { label: el[key], value: el[value] };
  });
  return options;
};

export const mapStringsToLabelValueArray = (optionsArr) => {
  const options = optionsArr.map((el) => {
    return { label: el, value: el };
  });
  return options;
};
