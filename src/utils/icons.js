const pressureList1 = ["psi", "pa"];
const pressureList2 = ["Pascal", "Pascals"];
const pressureList = pressureList1.concat(pressureList2);
export function isPressure(text) {return pressureList.includes(text);}

const temperatureList1 = ["°C", "°F", "K"];
const temperatureList2 = ["Celsius", "Fahrenheit", "Kelvin"];
const temperatureList = temperatureList1.concat(temperatureList2);
export function isTemperature(text) {return temperatureList.includes(text);}

const weightList1 = ["kg", "lbs", "N"];
const weightList2 = ["Kilogram","Kilograms", "Pound", "Pounds", "Newtons"];
const weightList = weightList1.concat(weightList2);
export function isWeight(text) {return weightList.includes(text);}

const voltageList1 = ["V", "mV", "nV"];
const voltageList2 = ["Volt", "Volts", "milliVolt","milliVolts", "nanoVolt","nanoVolts"];
const voltageList = voltageList1.concat(voltageList2);
export function isVoltage(text) {return voltageList.includes(text);}