import { FC } from "react";
import Modal from "../UI/Modal";
import classes from "./SetIntervalForm.module.scss";
import { Formik, Form, Field } from "formik";
import { setIntervalAction } from "../../store/chartsdata/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectChartsData } from "../../store/chartsdata/chartSlice";

type InitialValuesType = {
  interval: number | string;
};

enum IntervalOptions {
  five = 5000,
  ten = 10000,
  fifteen = 15000,
}

type SetIntervalFormProps = {
  onClose: () => void;
};

const SetIntervalForm: FC<SetIntervalFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { interval } = useAppSelector(selectChartsData);
  const submitHandler = (values: InitialValuesType) => {
    if (interval === +values.interval) {
      onClose();
    } else {
      dispatch(setIntervalAction(+values.interval));
      onClose();
    }
  };
  const initialValues: InitialValuesType = {
    interval: interval,
  };
  return (
    <Modal onClose={onClose}>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form className={classes.SetIntervalForm}>
          <h2 className={classes.SetIntervalForm__title}>
            Set new interval to update charts
          </h2>
          <div className={classes.SetIntervalForm__control}>
            <Field
              id="interval"
              name="interval"
              as="select"
              className={classes.SetIntervalForm__control_select}
            >
              <option value={IntervalOptions.five}>5</option>
              <option value={IntervalOptions.ten}>10</option>
              <option value={IntervalOptions.fifteen}>15</option>
            </Field>
            <button
              type="submit"
              className={classes.SetIntervalForm__control_btn}
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default SetIntervalForm;
