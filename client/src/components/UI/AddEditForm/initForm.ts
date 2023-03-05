export type InitialValues = {
  chartName: string;
  priceColor: string;
  previousPriceColor: string;
  description: string;
};
export type ValidateValues = {
  chartName?: string;
  priceColor?: string;
  previousPriceColor?: string;
  description?: string;
};

export const initialValues: InitialValues = {
  chartName: "",
  priceColor: "#e66465",
  previousPriceColor: "#f6b73c",
  description: "",
};

export const validate = (values: InitialValues): ValidateValues => {
  const { chartName, description } = values;
  const errors: ValidateValues = {};

  if (!chartName.trim()) {
    errors.chartName = "Required!";
    values.chartName = "";
  }
  if (!description.trim()) {
    errors.description = "Required!";
    values.description = "";
  }
  return errors;
};
