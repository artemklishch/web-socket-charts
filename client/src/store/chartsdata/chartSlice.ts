import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../";
import { ChartDataType, ChartType } from "../../types.d";

const DUMMY_CHARTS = [
  {
    id: 1,
    name: "HBF",
    priceColor: "#8884d8",
    prevPriceColor: "#1104d0",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ab iure similique animi accusamus cumque molestiae labore repudiandae, aut iusto voluptate totam eum hic! Delectus itaque, repudiandae molestias ducimus consequuntur, porro dolorem ullam similique voluptates nihil cum cupiditate illo. Qui autem sequi harum et nobis repellendus reiciendis ipsam quod aspernatur, quas itaque voluptas mollitia ad earum voluptates. Omnis consequuntur delectus, minus illum amet voluptatum facere quos iusto dolores necessitatibus in itaque deserunt voluptates temporibus odio. Mollitia ea, provident dicta molestiae, alias ducimus officia voluptatum in praesentium incidunt dolor fugit natus soluta quidem velit magnam optio quod beatae reprehenderit? Saepe, doloremque.",
    mentricDataKey: "month",
    priceTitle: "Price",
    prevPriceTitle: "Previos Price",
    metricData: [
      {
        Price: 3001,
        "Previos Price": 2400,
        month: "Jan",
      },
      {
        Price: 1000,
        "Previos Price": 1400,
        month: "Feb",
      },
      {
        Price: 2100,
        "Previos Price": 2000,
        month: "March",
      },
    ],
  },
  {
    id: 2,
    name: "HBsafasfF",
    priceColor: "#0184d0",
    prevPriceColor: "#9004d0",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ab iure similique animi accusamus cumque molestiae labore repudiandae, aut iusto voluptate totam eum hic! Delectus itaque, repudiandae molestias ducimus consequuntur, porro dolorem ullam similique voluptates nihil cum cupiditate illo. Qui autem sequi harum et nobis repellendus reiciendis ipsam quod aspernatur, quas itaque voluptas mollitia ad earum voluptates. Omnis consequuntur delectus, minus illum amet voluptatum facere quos iusto dolores necessitatibus in itaque deserunt voluptates temporibus odio. Mollitia ea, provident dicta molestiae, alias ducimus officia voluptatum in praesentium incidunt dolor fugit natus soluta quidem velit magnam optio quod beatae reprehenderit? Saepe, doloremque.",
    mentricDataKey: "month",
    priceTitle: "Price",
    prevPriceTitle: "Previos Price",
    metricData: [
      {
        Price: 1001,
        "Previos Price": 1400,
        month: "Jan",
      },
      {
        Price: 1200,
        "Previos Price": 4400,
        month: "Feb",
      },
      {
        Price: 3100,
        "Previos Price": 2300,
        month: "March",
      },
    ],
  },
  {
    id: 3,
    name: "ABBBA",
    priceColor: "#2224d8",
    prevPriceColor: "#4444f0",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ab iure similique animi accusamus cumque molestiae labore repudiandae, aut iusto voluptate totam eum hic! Delectus itaque, repudiandae molestias ducimus consequuntur, porro dolorem ullam similique voluptates nihil cum cupiditate illo. Qui autem sequi harum et nobis repellendus reiciendis ipsam quod aspernatur, quas itaque voluptas mollitia ad earum voluptates. Omnis consequuntur delectus, minus illum amet voluptatum facere quos iusto dolores necessitatibus in itaque deserunt voluptates temporibus odio. Mollitia ea, provident dicta molestiae, alias ducimus officia voluptatum in praesentium incidunt dolor fugit natus soluta quidem velit magnam optio quod beatae reprehenderit? Saepe, doloremque.",
    mentricDataKey: "month",
    priceTitle: "Price",
    prevPriceTitle: "Previos Price",
    metricData: [
      {
        Price: 3101,
        "Previos Price": 2450,
        month: "Jan",
      },
      {
        Price: 10000,
        "Previos Price": 14000,
        month: "Feb",
      },
      {
        Price: 2100,
        "Previos Price": 2100,
        month: "March",
      },
    ],
  },
  {
    id: 4,
    name: "BAF",
    priceColor: "#234d8",
    prevPriceColor: "#4644d0",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ab iure similique animi accusamus cumque molestiae labore repudiandae, aut iusto voluptate totam eum hic! Delectus itaque, repudiandae molestias ducimus consequuntur, porro dolorem ullam similique voluptates nihil cum cupiditate illo. Qui autem sequi harum et nobis repellendus reiciendis ipsam quod aspernatur, quas itaque voluptas mollitia ad earum voluptates. Omnis consequuntur delectus, minus illum amet voluptatum facere quos iusto dolores necessitatibus in itaque deserunt voluptates temporibus odio. Mollitia ea, provident dicta molestiae, alias ducimus officia voluptatum in praesentium incidunt dolor fugit natus soluta quidem velit magnam optio quod beatae reprehenderit? Saepe, doloremque.",
    mentricDataKey: "month",
    priceTitle: "Price",
    prevPriceTitle: "Previos Price",
    metricData: [
      {
        Price: 4101,
        "Previos Price": 2550,
        month: "Jan",
      },
      {
        Price: 5000,
        "Previos Price": 5400,
        month: "Feb",
      },
      {
        Price: 2600,
        "Previos Price": 3400,
        month: "March",
      },
    ],
  },
];

interface ChartsState {
  chartsData: ChartDataType[];
  charttype: string | null;
}

const initialState: ChartsState = {
  chartsData: DUMMY_CHARTS,
  charttype: null,
};

export const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setStartChartType(state) {
      const charttype =
        localStorage.getItem("charttype") || ChartType.linechart;
      state.charttype = charttype;
    },
    changeChartType(state, action: PayloadAction<string>) {
      localStorage.setItem("charttype", action.payload);
      state.charttype = action.payload;
    },
  },
});

export const { setStartChartType, changeChartType } = chartsSlice.actions;

export const selectChartsData = (state: RootState) => state.charts;

export default chartsSlice.reducer;
