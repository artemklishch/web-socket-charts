import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../";
import { ChartDataType } from "../../types";
import { getChartType, setChartType } from "../../localeStorage";
import { ChartData } from "../../types";

interface ChartsState {
  chartsData: ChartDataType[] | null;
  charttype: string | null;
  isChartSocketLoading: boolean;
  isModalNotification: boolean;
  isError: string | null;
  successText: string | null;
  chartOnPage: ChartDataType | null | undefined;
  interval: number;
  isEditing: boolean;
}

const initialState: ChartsState = {
  chartsData: null,
  charttype: null,
  isChartSocketLoading: true,
  isModalNotification: false,
  isError: null,
  successText: null,
  chartOnPage: null,
  interval: 5000,
  isEditing: false,
};

export const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setStartChartType(state) {
      const charttype = getChartType();
      state.charttype = charttype;
    },
    changeChartType(state, action: PayloadAction<string>) {
      setChartType(action.payload);
      state.charttype = action.payload;
    },
    startGettingCharts(state, data: PayloadAction<ChartDataType[]>) {
      if (Array.isArray(data.payload)) {
        state.chartsData = data.payload;
      } else {
        state.chartsData = [];
      }
    },
    setChartSocketLoading(state, action: PayloadAction<boolean>) {
      state.isChartSocketLoading = action.payload;
    },
    setIsError(state, action: PayloadAction<string | null>) {
      state.isError = action.payload;
    },
    setSuccessText(state, action: PayloadAction<string | null>) {
      state.successText = action.payload;
    },
    addNewChart(state, action: PayloadAction<ChartDataType>) {
      if (state.chartsData) {
        state.chartsData.unshift(action.payload);
      } else {
        state.chartsData = [action.payload];
      }
    },
    deleteChart(state, action: PayloadAction<string | number>) {
      const chart = state.chartsData!.find((ch) => ch.id === action.payload);
      if (chart && !chart.isReserved) {
        state.chartsData = state.chartsData!.filter(
          (ch) => ch.id !== action.payload
        );
      }
    },
    setIsModalNotOpenClose(state, action: PayloadAction<boolean>) {
      state.isModalNotification = action.payload;
    },
    setChartOnPage(
      state,
      action: PayloadAction<ChartDataType | null | undefined>
    ) {
      state.chartOnPage = action.payload;
    },
    editChart(
      state,
      action: PayloadAction<{ id: string | number; chartData: ChartData }>
    ) {
      const editedChartIndex = state.chartsData!.findIndex(
        (ch) => String(ch.id) === String(action.payload.id)
      );
      if (editedChartIndex >= 0) {
        state.chartsData![editedChartIndex] = {
          ...state.chartsData![editedChartIndex],
          ...action.payload.chartData,
        };
      }
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    setIntervalValue(state, action: PayloadAction<number>) {
      state.interval = action.payload;
    },
  },
});

export const {
  setStartChartType,
  changeChartType,
  startGettingCharts,
  setChartSocketLoading,
  setIsModalNotOpenClose,
  setIsError,
  addNewChart,
  setSuccessText,
  deleteChart,
  setChartOnPage,
  editChart,
  setIsEditing,
  setIntervalValue,
} = chartsSlice.actions;

export const selectChartsData = (state: RootState) => state.charts;

export default chartsSlice.reducer;
