import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../../routes";
import classes from "./MainLayoutDesc.module.scss";

type MainLayoutDescProps = {
  children: ReactNode;
};

const MainLayoutDesc: FC<MainLayoutDescProps> = ({ children }) => {
  return (
    <div className={classes.MainLayoutDesc}>
      <nav className={classes.MainLayoutDesc__nav}>
        <NavLink to={routes.homepage}>Home</NavLink>
        <NavLink to={routes.chartspage}>Charts</NavLink>
      </nav>
      <aside className={classes.MainLayoutDesc__content}>{children}</aside>
    </div>
  );
};

export default MainLayoutDesc;
