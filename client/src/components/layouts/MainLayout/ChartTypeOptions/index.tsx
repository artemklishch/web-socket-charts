import { FC, MouseEvent } from "react";
import classes from "./ChartTypeOptions.module.scss";
import { ChartType } from "../../../../types";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  selectChartsData,
  changeChartType,
} from "../../../../store/chartsdata/chartSlice";

const ChartTypeOptions: FC = () => {
  const dispatch = useAppDispatch();
  const { charttype } = useAppSelector(selectChartsData);
  const onChangeChartType = (e: MouseEvent) => {
    const item = e.target as HTMLElement;
    if (item.dataset.charttype === charttype) {
      return;
    }
    dispatch(changeChartType(item.dataset.charttype as string));
  };
  return (
    <ul className={classes.ChartTypeOptions}>
      <li
        className={classes.ChartTypeOptions__item}
        data-active={ChartType.linechart === charttype}
        data-charttype={ChartType.linechart}
        onClick={onChangeChartType}
      >
        Line Chart
      </li>
      <li
        className={classes.ChartTypeOptions__item}
        data-active={ChartType.areachart === charttype}
        data-charttype={ChartType.areachart}
        onClick={onChangeChartType}
      >
        Area Chart
      </li>
      <li
        className={classes.ChartTypeOptions__item}
        data-active={ChartType.barchart === charttype}
        data-charttype={ChartType.barchart}
        onClick={onChangeChartType}
      >
        Bar Chart
      </li>
      <li
        className={classes.ChartTypeOptions__item}
        data-active={ChartType.piechart === charttype}
        data-charttype={ChartType.piechart}
        onClick={onChangeChartType}
      >
        Pie Chart
      </li>
    </ul>
  );
};

export default ChartTypeOptions;
