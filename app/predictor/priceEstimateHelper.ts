"use server";

export default async function getPriceEstimate(
  name: string,
  brand: string,
  ram: number,
  storage_capacity: number,
  camera_resolution: number,
  operating_system: string,
  screen_size: number,
  condition: string,
  color: string
) {
  return new Promise((resolve, reject) => {
    var exec = require("child_process").exec;
    let price;
    exec(
      `python3 model.py "${name}" "${brand}" ${ram} ${storage_capacity} ${camera_resolution} "${operating_system}" ${screen_size} "${condition}" "${color}"`,
      function (error: any, stdout: any, stderr: any) {
        price = JSON.parse(stdout)[0];
        resolve(price);
      }
    );
  });
}
