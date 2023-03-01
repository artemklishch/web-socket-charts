import { ResponsiveContainer } from "recharts";
import classes from "./ChartPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectChartsData } from "../../store/chartsdata/chartSlice";
import { ChartDataType } from "../../types";
import useChartWidthHook from "../../customHooks/useChartWidthHook";

import Chart from "../../components/UI/Chart";

const ChartPage = () => {
  const { chartId } = useParams();
  const { chartsData, charttype } = useAppSelector(selectChartsData);
  const { blockWidth, blockRef } = useChartWidthHook();
  const chartData: ChartDataType | undefined = chartsData.find(
    (ch) => String(ch.id) === chartId
  );
  if (!chartData) {
    return null;
  }
  return (
    <div ref={blockRef} className={classes.ChartPage}>
      <h3 className={classes.ChartPage__title}>{chartData.name}</h3>
      <ResponsiveContainer width="99%" height={window.innerHeight / 2}>
        <Chart
          chartData={chartData}
          charttype={charttype}
          chartWidth={blockWidth}
          chartHeight={window.innerHeight / 2}
        />
      </ResponsiveContainer>
      <p className={classes.ChartPage__descr}>{chartData.description}</p>
      <div className={classes.ChartPage__actions}>
        <button className={classes.ChartPage__actions_btn}>Edit Chart</button>
        <button className={classes.ChartPage__actions_btn} data-danger>
          Delete Chart
        </button>
      </div>
    </div>
  );
};

export default ChartPage;
