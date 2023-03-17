import { FC } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import { ChartDataType, ChartType } from "../../../types";

type ChartProps = {
  charttype: string | null;
  chartData: ChartDataType;
  chartWidth: number;
  chartHeight: number;
};

const Chart: FC<ChartProps> = ({
  charttype,
  chartData,
  chartWidth,
  chartHeight,
}) => {
  const {
    metricData,
    prevPriceColor,
    priceColor,
    mentricDataKey,
    priceTitle,
    prevPriceTitle,
  } = chartData;
  let chartForRender = (
    <LineChart width={chartWidth} height={chartHeight} data={metricData}>
      <Line type="monotone" dataKey={priceTitle} stroke={priceColor} />
      <Line type="monotone" dataKey={prevPriceTitle} stroke={prevPriceColor} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey={mentricDataKey} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
  if (charttype === ChartType.areachart) {
    const colorId = Math.random().toString() + "colorPrice-" + priceColor;
    const prevColorId =
      Math.random().toString() + "colorPreviosPrice-" + prevPriceColor;
    chartForRender = (
      <AreaChart width={chartWidth} height={chartHeight} data={metricData}>
        <defs>
          <linearGradient id={colorId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={priceColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={priceColor} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={prevColorId} x1="0" y1="0" x2="0" y2="1">
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
          fill={`url(#${colorId})`}
        />
        <Area
          type="monotone"
          dataKey={prevPriceTitle}
          stroke={prevPriceColor}
          fillOpacity={1}
          fill={`url(#${prevColorId})`}
        />
      </AreaChart>
    );
  } else if (charttype === ChartType.barchart) {
    chartForRender = (
      <BarChart width={chartWidth} height={chartHeight} data={metricData}>
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
      <PieChart width={chartWidth} height={chartHeight}>
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
  return chartForRender;
};

export default Chart;
