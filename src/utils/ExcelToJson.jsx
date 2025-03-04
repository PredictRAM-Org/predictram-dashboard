import * as XLSX from 'xlsx';

const convertExcelToJson = async (path) => {
  try {
    const res = await fetch(path);
    const dataa = await res.arrayBuffer();
    const wb = XLSX.read(dataa, { type: "array" });
    const sn = wb.SheetNames[0];
    const worksheet = wb.Sheets[sn];
    const parsed = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const keys = parsed[0];
    const d = parsed.slice(1);

    const arrayOfObjects = d.map((row) => {
      const obj = {};
      keys.forEach((key, index) => {
        obj[key] = row[index];
      });
      return obj;
    });

    return { arrayOfObjects };
  } catch (error) {
    console.error("Error converting Excel to JSON:", error);
    return null;
  }
};

export default convertExcelToJson;
