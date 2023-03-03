import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import classes from "./App.module.scss";
import routes from "./routes";
import {
  setStartChartType,
  startGettingCharts,
  setChartSocketLoading,
} from "./store/chartsdata/chartSlice";
import { useAppDispatch } from "./store/hooks";
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

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setStartChartType());
    socket.on("connect_error", (err: any) => {
      console.log("Error happend", err.message);
      navigate(routes.errorpage);
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
  }, [dispatch, navigate]);
  return (
    <main className={classes.App}>
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
