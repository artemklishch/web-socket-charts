export type ChartDataType = {
  id: number | string;
  name: string;
  priceColor: string;
  prevPriceColor: string;
  description: string;
  mentricDataKey: string;
  priceTitle: string;
  prevPriceTitle: string;
  isReserved?: boolean;
  metricData: Array<{
    Price: number;
    "Previos Price": number | null;
    month: string;
  }>;
};

export enum ChartType {
  linechart = "linechart",
  areachart = "areachart",
  barchart = "barchart",
  piechart = "piechart",
}

export type GetLocStStr = () => string | null;
export type SetLocStStr = (val: string) => void;
export type SetLocStStrNoArg = () => void;
export type ClearLocSt = () => void;

export type ChartData = {
  name: string;
  priceColor: string;
  prevPriceColor: string;
  description: string;
};
