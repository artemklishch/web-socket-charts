import { FC } from "react";
import classes from "./FormField.module.scss";
import { Field, ErrorMessage } from "formik";

type FormFieldProps = {
  fieldName: string;
  label: string;
  type?: string;
  component?: any;
};

const FormField: FC<FormFieldProps> = ({
  type,
  fieldName,
  component = "input",
  label,
}) => {
  return (
    <div className={classes.FormField}>
      <span className={classes.FormField__label}>{label}</span>
      <Field
        className={classes.FormField__textfield}
        type={type}
        name={fieldName}
        component={component}
      />
      <ErrorMessage name={fieldName}>
        {(msg) => <div className={classes.FormField__errorText}>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default FormField;
