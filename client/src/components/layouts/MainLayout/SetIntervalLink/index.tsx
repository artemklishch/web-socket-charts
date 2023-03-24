import { FC, useState } from "react";
import classes from "./SetIntervalLink.module.scss";
import { selectChartsData } from "../../../../store/chartsdata/chartSlice";
import { useAppSelector } from "../../../../store/hooks";

import ModalNotification from "../../../ModalNotification";
import SetIntervalForm from "../../../SetIntervalForm";

const SetIntervalLink: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isModalNotification, interval } = useAppSelector(selectChartsData);
  const intervalValue = interval / 1000;
  const openIntervalModal = () => setIsOpen(true);
  return (
    <>
      {isModalNotification && <ModalNotification />}
      {isOpen && <SetIntervalForm onClose={() => setIsOpen(false)} />}
      <div className={classes.SetIntervalLink} onClick={openIntervalModal}>
        Set interval ({intervalValue}sec)
      </div>
    </>
  );
};

export default SetIntervalLink;
