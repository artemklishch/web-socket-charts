import { useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import classes from "./ChartPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectChartsData,
  setChartOnPage,
} from "../../store/chartsdata/chartSlice";
import { ChartDataType } from "../../types";
import useChartWidthHook from "../../customHooks/useChartWidthHook";

import Chart from "../../components/UI/Chart";
import ModalNotification from "../../components/ModalNotification";
import ActionBtns from "./ActionBtns";
import Spinner from "../../components/UI/Spinner";

const ChartPage = () => {
  const dispatch = useAppDispatch();
  const { chartId } = useParams();
  const { chartsData, charttype, isModalNotification, chartOnPage } =
    useAppSelector(selectChartsData);
  const { blockWidth, blockRef } = useChartWidthHook();
  useEffect(() => {
    const chartData: ChartDataType | undefined = chartsData?.find(
      (ch) => String(ch.id) === chartId
    );
    dispatch(setChartOnPage(chartData));
    return () => {
      if (chartOnPage) {
        dispatch(setChartOnPage(null));
      }
    };
  }, [chartId, chartsData, dispatch, chartOnPage]);
  return (
    <div ref={blockRef} className={classes.ChartPageWrapp}>
      {isModalNotification && <ModalNotification />}
      {chartsData === null ? (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      ) : chartOnPage && chartId ? (
        <div className={classes.ChartPage}>
          <h3 className={classes.ChartPage__title}>{chartOnPage.name}</h3>
          <ResponsiveContainer width="99%" height={window.innerHeight / 2}>
            <Chart
              chartData={chartOnPage}
              charttype={charttype}
              chartWidth={blockWidth}
              chartHeight={window.innerHeight / 2}
            />
          </ResponsiveContainer>
          <p className={classes.ChartPage__descr}>{chartOnPage.description}</p>
          <ActionBtns chartId={chartId} />
        </div>
      ) : (
        <p className={classes.notfound}>Chart not found</p>
      )}
    </div>
  );
};

export default ChartPage;
