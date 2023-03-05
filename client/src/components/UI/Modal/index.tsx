import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";

type ModalProps = {
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ children }) => {
  const modalWrapper = (
    <div className={classes.Modal}>
      <div className={classes.Modal__window}>{children}</div>
    </div>
  );
  return ReactDOM.createPortal(modalWrapper, document.body);
};

export default Modal;
