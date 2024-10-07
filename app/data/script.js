import ExcelJs from "exceljs";
import fs from "fs";
import path from "path";

async function main() {
  const workbook = new ExcelJs.Workbook(); // Create New Workbook
  await workbook.csv.readFile("cleaned mobile_resale.csv"); // Load Data
  const worksheet = workbook.worksheets[0];
  const rows = worksheet.getRows(0, worksheet.rowCount);

  let allData = [];
  for (let row of rows) {
    let rowData = getRowValues(row);

    let obj = {
      name: rowData[0],
      brand: rowData[1],
      ram: rowData[2],
      storage_capacity: rowData[3],
      camera_resolution: rowData[4],
      operating_system: rowData[5],
      screen_size: rowData[6],
      condition: rowData[7],
      color: rowData[8],
      currency: rowData[9],
      price: rowData[10],
    };
    allData.push(obj);
  }

  const filePath = path.join("./", "data.json");
  fs.writeFileSync(filePath, JSON.stringify(allData));
  console.log("JSON file created successfully.");
}

export function getRowValues(row) {
  const values = [];
  for (const cell of row._cells) {
    if (cell && cell.value) {
      if (cell.result) {
        values.push(cell.value.result);
      } else if (cell.value.text) {
        values.push(cell.value.text);
      } else if (cell.value.error) {
        // return null
        values.push(null);
      } else {
        values.push(cell.value);
      }
    } else {
      values.push(null);
    }
  }
  return values;
}

export function getStringOrNull(item) {
  try {
    if (item === "" || item === null || item === undefined) {
      return null;
    }

    if (item && typeof item === "string") {
      return item;
    }

    if (item && item.toString) {
      return item.toString();
    }

    return JSON.stringify(item);
  } catch (error) {
    return null;
  }
}

await main();
