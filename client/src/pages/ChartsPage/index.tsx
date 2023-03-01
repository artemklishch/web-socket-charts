import { NavLink } from "react-router-dom";
import classes from "./ChartsPage.module.scss";
import { useAppSelector } from "../../store/hooks";
import { selectChartsData } from "../../store/chartsdata/chartSlice";
import { ResponsiveContainer } from "recharts";
import routes from "../../routes";
import useChartWidthHook from "../../customHooks/useChartWidthHook";

import Chart from "../../components/UI/Chart";

const ChartsPage = () => {
  const { chartsData, charttype } = useAppSelector(selectChartsData);
  const { blockWidth, blockRef } = useChartWidthHook();
  return (
    <div className={classes.ChartsPage}>
      {chartsData.length > 0 &&
        chartsData.map((chartData) => (
          <section
            ref={blockRef}
            className={classes.ChartsPage__chartSection}
            key={chartData.id}
          >
            <h3 className={classes.ChartsPage__chartSection_title}>
              {chartData.name}
            </h3>
            <ResponsiveContainer width="99%" height={300}>
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
              to={`${routes.chartspage}/${1}`}
              className={classes.ChartsPage__chartSection_detailsBtn}
            >
              Details
            </NavLink>
          </section>
        ))}
    </div>
  );
};

export default ChartsPage;
