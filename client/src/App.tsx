import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import classes from "./App.module.scss";
import routes from "./routes";
import { setStartChartType } from "./store/chartsdata/chartSlice";
import { useAppDispatch } from "./store/hooks";

import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ChartsPage from "./pages/ChartsPage";
import ChartPage from "./pages/ChartPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setStartChartType());
  }, [dispatch]);
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
