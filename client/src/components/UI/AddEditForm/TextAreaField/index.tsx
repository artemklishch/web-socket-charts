import { FC } from "react";
import classes from "./TextAreaField.module.scss";
import {ErrorMessage} from 'formik'

type TextAreaFieldProps = {
    name: string;
    label: string;
};

const TextAreaField: FC<TextAreaFieldProps> = ({name, label}) => {
  return (
    <div className={classes.TextAreaField}>
      <label htmlFor={name} className={classes.InputField__label}>
        {label}
      </label>
      {/* <Field
        type={type}
        id={name}
        name={name}
        className={classes.InputField__field}
      /> */}
      {/* <ErrorMessage name={name}>
        {(error) => (
          <span className={classes.InputField__errortext}>{error}</span>
        )}
      </ErrorMessage> */}
    </div>
  );
};

export default TextAreaField;
