import { NavLink } from "react-router-dom";
import classes from "./ChartsPage.module.scss";
import { useAppSelector } from "../../store/hooks";
import { selectChartsData } from "../../store/chartsdata/chartSlice";
import routes from "../../routes";
import useChartWidthHook from "../../customHooks/useChartWidthHook";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
} from "recharts";

import Chart from "../../components/UI/Chart";
import Spinner from "../../components/UI/Spinner";

const ChartsPage = () => {
  const { chartsData, charttype } = useAppSelector(selectChartsData);
  const { blockWidth, blockRef } = useChartWidthHook();
  return (
    <div className={classes.ChartsPage} ref={blockRef}>
      {chartsData === null ? (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      ) : chartsData.length === 0 ? (
        <p className={classes.notfound}>No charts found</p>
      ) : (
        chartsData.map((chartData) => (
          <section
            className={classes.ChartsPage__chartSection}
            key={chartData.id}
          >
            <h3 className={classes.ChartsPage__chartSection_title}>
              {chartData.name}
            </h3>
            <ResponsiveContainer width="99%" height={300} key={chartData.id}>
              <Chart
                chartData={chartData}
                charttype={charttype}
                chartWidth={blockWidth}
                chartHeight={300}
              />
            </ResponsiveContainer>
            <p className={classes.ChartsPage__chartSection_descr}>
              {chartData.description}
            </p>
            <NavLink
              to={`${routes.chartspage}/${chartData.id}`}
              className={classes.ChartsPage__chartSection_detailsBtn}
            >
              Details
            </NavLink>
          </section>
        ))
      )}
    </div>
  );
};

export default ChartsPage;
