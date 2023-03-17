import { FC, MouseEvent, ReactNode } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";

import { ReactComponent as CloseIcon } from "../../../assets/icons/close_icon.svg";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const onCloseHandler = (e: MouseEvent) => {
    if ((e.target as HTMLElement).dataset.onclose) {
      onClose();
    }
  };
  const modalWrapper = (
    <div className={classes.Modal} onClick={onCloseHandler} data-onclose>
      <div className={classes.Modal__window}>
        <CloseIcon
          data-onclose
          className={classes.Modal__window_closeicon}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
  return ReactDOM.createPortal(modalWrapper, document.body);
};

export default Modal;
