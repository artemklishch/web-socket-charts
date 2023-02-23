import { FC, ReactNode } from "react";
import classes from "./MainLayout.module.scss";
import MainLayoutDesc from "./MainLayoutDesc";
import MainLayoutMob from "./MainLayoutMob";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={classes.MainLayout}>
      <MainLayoutMob children={children} />
      <MainLayoutDesc children={children} />
    </div>
  );
};

export default MainLayout;
