import { FC } from "react";
import classes from "./AddChartLink.module.scss";

import AddEditForm from "../../../UI/AddEditForm";

const AddChartLink: FC = () => {
  return (
    <>
      <AddEditForm />
      <div className={classes.AddChartLink}>Add new chart</div>
    </>
  );
};

export default AddChartLink;
