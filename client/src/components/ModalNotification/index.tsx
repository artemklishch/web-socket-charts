import { FC, useEffect } from "react";
import classes from "./ModalNotification.module.scss";
import {
  setIsError,
  selectChartsData,
  setSuccessText,
  setIsModalNotOpenClose,
} from "../../store/chartsdata/chartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "../UI/Modal";

const ModalNotification: FC = () => {
  const dispatch = useAppDispatch();
  const { isError, successText } = useAppSelector(selectChartsData);
  useEffect(() => {
    return () => {
      if (isError) {
        dispatch(setIsError(null));
      }
      if (successText) {
        dispatch(setSuccessText(null));
      }
    };
  }, [dispatch, isError, successText]);
  const onCloseHandler = () => dispatch(setIsModalNotOpenClose(false));
  return (
    <Modal onClose={onCloseHandler}>
      <div className={classes.ModalNotification}>
        {!!isError ? (
          <p className={classes.ModalNotification__error}>{isError}</p>
        ) : (
          <p className={classes.ModalNotification__success}>{successText}</p>
        )}
      </div>
    </Modal>
  );
};

export default ModalNotification;
