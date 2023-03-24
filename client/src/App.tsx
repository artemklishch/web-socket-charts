import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import classes from "./App.module.scss";
import routes from "./routes";
import {
  setStartChartType,
  startGettingCharts,
  setChartSocketLoading,
  setIsError,
  setIsModalNotOpenClose,
  selectChartsData,
} from "./store/chartsdata/chartSlice";
import { getIntervalAction } from "./store/chartsdata/api";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ChartDataType } from "./types";
import socket from "./web-socket";
import {
  clearSocketStatus,
  getSocketStatus,
  setSocketStatus,
} from "./localeStorage";

import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ChartsPage from "./pages/ChartsPage";
import ChartPage from "./pages/ChartPage";
import ErrorPage from "./pages/ErrorPage";
import ModalNotification from "./components/ModalNotification";

function App() {
  const dispatch = useAppDispatch();
  const { isModalNotification } = useAppSelector(selectChartsData);
  useEffect(() => {
    dispatch(setStartChartType());
    dispatch(getIntervalAction());
    socket.on("connect_error", (err: any) => {
      console.log("Error happend", err.message);
      dispatch(setIsError("Failed to get data"));
      dispatch(setIsModalNotOpenClose(true));
      dispatch(startGettingCharts([]));
      socket.disconnect();
      dispatch(setChartSocketLoading(false));
    });
    socket.on("connect", () => {
      setSocketStatus();
      dispatch(setChartSocketLoading(false));
    });
    socket.on("disconnect", () => {
      clearSocketStatus();
      dispatch(setChartSocketLoading(false));
    });
    socket.on("getchartdata", (arg: ChartDataType[], err: any) => {
      dispatch(startGettingCharts(arg));
    });
    return () => {
      if (!!getSocketStatus()) {
        clearSocketStatus();
      }
    };
  }, [dispatch]);
  return (
    <main className={classes.App}>
      {isModalNotification && <ModalNotification />}
      <MainLayout>
        <Routes>
          <Route path={routes.homepage} element={<HomePage />} />
          <Route path={routes.chartspage} element={<ChartsPage />} />
          <Route path={routes.chartpage} element={<ChartPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MainLayout>
    </main>
  );
}

export default App;
