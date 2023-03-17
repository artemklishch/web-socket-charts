import { FC, useState } from "react";
import { selectChartsData } from "../../../../store/chartsdata/chartSlice";
import { useAppSelector } from "../../../../store/hooks";
import classes from "./AddChartLink.module.scss";

import AddEditForm from "../../../AddEditForm";
import ModalNotification from "../../../ModalNotification";

const AddChartLink: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isModalNotification } = useAppSelector(selectChartsData);
  const openModal = () => setIsOpen(true);
  return (
    <>
      {isModalNotification && <ModalNotification />}
      {isOpen && <AddEditForm onClose={() => setIsOpen(false)} />}
      <div className={classes.AddChartLink} onClick={openModal}>
        Add new chart
      </div>
    </>
  );
};

export default AddChartLink;
