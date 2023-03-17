import { Dispatch } from "redux";
import { createNewChart, onDeleteChart, onEditChart } from "../../api";
import { ChartData } from "../../types";
import {
  setIsModalNotOpenClose,
  setIsError,
  addNewChart,
  setSuccessText,
  deleteChart,
  editChart,
} from "./chartSlice";

export const createNewChartAction = (chartData: ChartData) => {
  return async (dispatch: Dispatch) => {
    let errorText = "Failed to save";
    try {
      const response = await createNewChart(chartData);
      if (!response.ok || response.status !== 200) {
        const errorData = await response.json();
        if (errorData.message) {
          errorText = errorData.message;
        }
        throw new Error();
      }
      const addedChart = await response.json();
      dispatch(addNewChart(addedChart));
      dispatch(setSuccessText("The chart was added successfully!"));
      dispatch(setIsModalNotOpenClose(true));
    } catch (err) {
      dispatch(setIsError(errorText));
      dispatch(setIsModalNotOpenClose(true));
    }
  };
};

export const deleteChartAction = (id: string | number) => {
  let errorText = "Failed to delete!";
  return async (dispatch: Dispatch) => {
    try {
      const response = await onDeleteChart(id);
      if (!response.ok || response.status !== 200) {
        const errorData = await response.json();
        if (errorData.message) {
          errorText = errorData.message;
        }
        throw new Error();
      }
      dispatch(deleteChart(id));
      dispatch(setSuccessText("The chart was deleted successfully!"));
      dispatch(setIsModalNotOpenClose(true));
    } catch (err) {
      dispatch(setIsError(errorText));
      dispatch(setIsModalNotOpenClose(true));
    }
  };
};

export const editChartAction = (id: string | number, chartData: ChartData) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await onEditChart(id, chartData);
      if (!response.ok || response.status !== 200) {
        throw new Error();
      }
      dispatch(editChart({ id, chartData }));
      dispatch(setSuccessText("The chart was edited successfully!"));
      dispatch(setIsModalNotOpenClose(true));
    } catch (err) {
      dispatch(setIsError("Failed to edit"));
      dispatch(setIsModalNotOpenClose(true));
    }
  };
};
