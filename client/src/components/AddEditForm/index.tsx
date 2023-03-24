import { FC, useEffect } from "react";
import { Formik, Form } from "formik";
import classes from "./AddEditForm.module.scss";
import { getInitialValues, InitialValues, validate } from "./initForm";
import {
  createNewChartAction,
  editChartAction,
} from "../../store/chartsdata/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectChartsData,
  setIsEditing,
} from "../../store/chartsdata/chartSlice";

import Modal from "../UI/Modal";
import FormField from "../UI/FormField";
import TextArea from "../UI/TextArea";

type AddEditFormProps = {
  onClose: () => void;
};

const AddEditForm: FC<AddEditFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { chartOnPage, isEditing } = useAppSelector(selectChartsData);
  useEffect(() => {
    return () => {
      if (isEditing) {
        dispatch(setIsEditing(false));
      }
    };
  }, [dispatch, isEditing]);
  const onSubmitHandler = (values: InitialValues) => {
    onClose();
    const areChanges =
      values.chartName !== chartOnPage?.name ||
      values.priceColor !== chartOnPage.priceColor ||
      values.previousPriceColor !== chartOnPage.prevPriceColor ||
      values.description !== chartOnPage.description;
    if (!areChanges) {
      return;
    }
    const dataToSave = {
      name: values.chartName.trim(),
      priceColor: values.priceColor,
      prevPriceColor: values.previousPriceColor,
      description: values.description.trim(),
    };
    if (areChanges && !chartOnPage) {
      dispatch(createNewChartAction(dataToSave));
    } else if (areChanges && chartOnPage) {
      dispatch(editChartAction(chartOnPage.id, dataToSave));
    }
  };
  const initialValues = getInitialValues(chartOnPage, isEditing);
  return (
    <Modal onClose={onClose}>
      <span className={classes.AddEditForm__warning}>
        *you can add no more then 10 charts
      </span>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validate={validate}
      >
        <Form className={classes.AddEditForm}>
          <FormField fieldName="chartName" label="Chart Name" />
          <FormField
            fieldName="priceColor"
            label="Current price color"
            type="color"
          />
          <FormField
            fieldName="previousPriceColor"
            label="Previos price color"
            type="color"
          />
          <FormField
            fieldName="description"
            label="Description"
            component={TextArea}
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
