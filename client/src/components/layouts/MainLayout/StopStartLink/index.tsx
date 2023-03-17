import { FC, useCallback } from "react";
import {
  selectChartsData,
  setChartSocketLoading,
} from "../../../../store/chartsdata/chartSlice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { getSocketStatus } from "../../../../localeStorage";
import socket from "../../../../web-socket";
import classes from "./StopStartLink.module.scss";

import Spinner from "../../../UI/Spinner";

const StopStartLink: FC = () => {
  const { isChartSocketLoading } = useAppSelector(selectChartsData);
  const dispatch = useAppDispatch();
  const gettingChartsHandler = useCallback(() => {
    if (isChartSocketLoading) {
      return;
    }
    dispatch(setChartSocketLoading(true));
    const isGettingCharts = !!getSocketStatus();
    if (isGettingCharts) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  }, [isChartSocketLoading, dispatch]);
  const isGettingCharts = !!getSocketStatus();
  const chartsStatusBtnText = isGettingCharts
    ? "Stop getting charts"
    : "Start getting charts";
  return (
    <div
      className={classes.StopStartLink}
      data-isgettinggharts={isGettingCharts}
      onClick={gettingChartsHandler}
    >
      <span>{chartsStatusBtnText}</span>
      {isChartSocketLoading && (
        <div className={classes.chartsStatusBtn__spinnerWrap}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default StopStartLink;
