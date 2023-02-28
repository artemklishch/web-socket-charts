export type ChartDataType = {
  id: number;
  name: string;
  priceColor: string;
  prevPriceColor: string;
  description: string;
  mentricDataKey: string;
  priceTitle: string;
  prevPriceTitle: string;
  metricData: Array<{
    Price: number;
    "Previos Price": number;
    month: string;
  }>;
};

export enum ChartType {
  linechart = "linechart",
  areachart = "areachart",
  barchart = "barchart",
  piechart = "piechart",
}
