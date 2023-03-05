import { FC } from "react";
import { Formik, Form } from "formik";
import classes from "./AddEditForm.module.scss";
import { initialValues, InitialValues, validate } from "./initForm";

import Modal from "../Modal";
import InputField from "./InputField";

const AddEditForm: FC = () => {
  const onSubmitHandler = (values: InitialValues) => {
    console.log("first", values);
  };
  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validate={validate}
      >
        <Form className={classes.AddEditForm}>
          <InputField name="chartName" label="Chart Name" />
          <InputField
            name="priceColor"
            label="Current price color"
            type="color"
          />
          <InputField
            name="previousPriceColor"
            label="Previos price color"
            type="color"
          />
          <button type="submit" className={classes.AddEditForm__saveBtn}>
            Save
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddEditForm;
