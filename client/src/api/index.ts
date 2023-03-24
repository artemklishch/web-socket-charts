import { ChartData } from "../types";
import endpoints from "./endpoints";

export const createNewChart = (chartData: ChartData) => {
  return fetch(process.env.REACT_APP_BASEURL + endpoints.createNewChart, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chartData),
  });
};

export const onDeleteChart = (id: string | number) => {
  return fetch(
    process.env.REACT_APP_BASEURL + endpoints.deleteChart + `/${id}`,
    {
      method: "DELETE",
    }
  );
};

export const onEditChart = (id: string | number, chartData: ChartData) => {
  return fetch(process.env.REACT_APP_BASEURL + endpoints.editChart + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chartData),
  });
};

export const getInterval = () => {
  return fetch(process.env.REACT_APP_BASEURL + endpoints.getInterval);
};

export const setInterval = (updatedInterval: number) => {
  return fetch(process.env.REACT_APP_BASEURL + endpoints.setInterval, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ interval: updatedInterval }),
  });
};
