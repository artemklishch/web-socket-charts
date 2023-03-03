import {
  ChartType,
  GetLocStStr,
  SetLocStStr,
  ClearLocSt,
  SetLocStStrNoArg,
} from "./types";

export const getChartType: GetLocStStr = () => {
  return localStorage.getItem("charttype") || ChartType.linechart;
};
export const setChartType: SetLocStStr = (value) => {
  localStorage.setItem("charttype", value);
};
export const getSocketStatus: GetLocStStr = () => {
  return localStorage.getItem("socketStatus");
};
export const setSocketStatus: SetLocStStrNoArg = () => {
  localStorage.setItem("socketStatus", "true");
};
export const clearSocketStatus: ClearLocSt = () => {
  localStorage.removeItem("socketStatus");
};
