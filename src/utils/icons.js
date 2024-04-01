const pressureList1 = ["psi", "pa"];
const pressureList2 = ["Pascal"];
const pressureList = pressureList1.concat(pressureList2);

const temperatureList1 = ["°C", "°F", "K"];
const temperatureList2 = ["Celsius", "Fahrenheit", "Kelvin"];
const temperatureList = temperatureList1.concat(temperatureList2);

export function isPressure(text) {
  return pressureList.includes(text);
}

export function isTemperature(text) {
  return temperatureList.includes(text);
}