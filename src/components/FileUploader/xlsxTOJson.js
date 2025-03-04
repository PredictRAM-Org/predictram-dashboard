import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const cleanObject = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] || obj[key] === false || obj[key] === 0) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export const xlsxToJson = (xlsx, type = "binary") => {
  const workbook = XLSX.read(xlsx, { type: type });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  const filterData = [];
  jsonData.forEach((row) => {
    const obj = cleanObject(row);
    if (Object.keys(obj).length > 0) {
      filterData.push(row);
    }
  });
  return filterData;
};

export const convertXlsxURLToJson = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const json = xlsxToJson(data, "array");
    return json;
  } catch (err) {
    toast.error(err.message);
  }
};
