import { FC } from "react";
import classes from "./InputField.module.scss";
import { Field, ErrorMessage } from "formik";

type InputFieldProps = {
  type?: string;
  name: string;
  label: string;
};

const InputField: FC<InputFieldProps> = ({ type = "text", name, label }) => {
  return (
    <div className={classes.InputField}>
      <label htmlFor={name} className={classes.InputField__label}>
        {label}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        className={classes.InputField__field}
      />
      <ErrorMessage name={name}>
        {(error) => (
          <span className={classes.InputField__errortext}>{error}</span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
