import { FC } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../../routes";
import classes from "./MainLayoutDesc.module.scss";

const MainLayoutDesc: FC = () => {
  return (
    <div className={classes.MainLayoutDesc}>
      <nav className={classes.MainLayoutDesc__nav}>
        <NavLink to={routes.homepage}>Home</NavLink>
        <NavLink to={routes.chartspage}>Charts</NavLink>
      </nav>
    </div>
  );
};

export default MainLayoutDesc;
