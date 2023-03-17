import { FC, useState } from "react";
import classes from "./ActionBtns.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { deleteChartAction } from "../../../store/chartsdata/api";
import { setIsEditing } from "../../../store/chartsdata/chartSlice";
import routes from "../../../routes";
import AddEditForm from "../../../components/AddEditForm";

type ActionBtnsProps = {
  chartId: string | number;
};

const ActionBtns: FC<ActionBtnsProps> = ({ chartId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onDeleteChartHandler = () => {
    dispatch(deleteChartAction(chartId!));
    navigate(routes.chartspage);
  };
  const onOpenModal = () => {
    dispatch(setIsEditing(true));
    setIsOpen(true);
  };
  return (
    <div className={classes.ActionBtns}>
      {isOpen && <AddEditForm onClose={() => setIsOpen(false)} />}
      <button className={classes.ActionBtns__btn} onClick={onOpenModal}>
        Edit Chart
      </button>
      <button
        className={classes.ActionBtns__btn}
        data-danger
        onClick={onDeleteChartHandler}
      >
        Delete Chart
      </button>
    </div>
  );
};

export default ActionBtns;
