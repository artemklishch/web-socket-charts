import { FC, useRef, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import classes from "./Chart.module.scss";
import { ChartDataType, ChartType } from "../../../types.d";

type ChartProps = {
  charttype: string;
  chartData: ChartDataType;
};

const Chart: FC<ChartProps> = ({ charttype, chartData }) => {
  const sectionBlockRef = useRef<HTMLElement | null>(null);
  const [sectionWidth, setSectionWidth] = useState<number>();
  const setChartWidth = () => {
    const sectionWidth = sectionBlockRef.current?.getBoundingClientRect().width;
    setSectionWidth(sectionWidth);
  };
  useEffect(() => {
    setChartWidth();
    window.addEventListener("resize", setChartWidth);
    return () => window.removeEventListener("resize", setChartWidth);
  }, []);
  const {
    metricData,
    prevPriceColor,
    priceColor,
    name,
    description,
    mentricDataKey,
    priceTitle,
    prevPriceTitle,
  } = chartData;
  let chartForRender = (
    <LineChart width={sectionWidth} height={300} data={metricData}>
      <Line type="monotone" dataKey={priceTitle} stroke={priceColor} />
      <Line type="monotone" dataKey={prevPriceTitle} stroke={prevPriceColor} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey={mentricDataKey} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
  if (charttype === ChartType.areachart) {
    chartForRender = (
      <AreaChart width={sectionWidth} height={300} data={metricData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={priceColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={priceColor} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPreviosPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={prevPriceColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={prevPriceColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey={mentricDataKey} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={priceTitle}
          stroke={priceColor}
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
        <Area
          type="monotone"
          dataKey={prevPriceTitle}
          stroke={prevPriceColor}
          fillOpacity={1}
          fill="url(#colorPreviosPrice)"
        />
      </AreaChart>
    );
  } else if (charttype === ChartType.barchart) {
    chartForRender = (
      <BarChart width={sectionWidth} height={300} data={metricData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={mentricDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={priceTitle} fill={priceColor} />
        <Bar dataKey={prevPriceTitle} fill={prevPriceColor} />
      </BarChart>
    );
  } else if (charttype === ChartType.piechart) {
    chartForRender = (
      <PieChart width={sectionWidth} height={300}>
        <Pie
          data={metricData}
          dataKey={priceTitle}
          nameKey={mentricDataKey}
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill={priceColor}
        />
        <Pie
          data={metricData}
          dataKey={prevPriceTitle}
          nameKey={mentricDataKey}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill={prevPriceColor}
          label
        />
        <Tooltip />
      </PieChart>
    );
  }
  return (
    <section ref={sectionBlockRef} className={classes.Chart}>
      <h3 className={classes.Chart__title}>{name}</h3>
      <ResponsiveContainer width="99%" height={300}>
        {chartForRender}
      </ResponsiveContainer>
      <p className={classes.Chart__descr}>{description}</p>
      <button className={classes.Chart__detailsBtn}>Details</button>
    </section>
  );
};

export default Chart;
