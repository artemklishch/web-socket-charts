import { ChartData } from "../types";
import endpoints from "./endpoints";
import { store } from "../store";

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

export const updateChartsOnReload = () => {
  const { chartsData, interval } = store.getState().charts;
  const dataToUpdate = {
    interval,
    chartsData,
  };
  return fetch(process.env.REACT_APP_BASEURL + "/updateCharts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToUpdate),
  });
};
