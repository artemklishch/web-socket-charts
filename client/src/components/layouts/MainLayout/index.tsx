import { FC, ReactNode, useCallback, useRef } from "react";
import classes from "./MainLayout.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import routes from "../../../routes";
import {
  selectChartsData,
  setChartSocketLoading,
} from "../../../store/chartsdata/chartSlice";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getSocketStatus } from "../../../localeStorage";
import socket from "../../../web-socket";

import { ReactComponent as BurgerIon } from "../../../assets/icons/burger_icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close_icon.svg";
import ChartTypeOptions from "./ChartTypeOptions";
import Spinner from "../../UI/Spinner";

type MainLayoutProps = {
  children: ReactNode;
};
const BREAKPOINT_WIDTH = 450;

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const navMenu = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { isChartSocketLoading } = useAppSelector(selectChartsData);
  const { pathname } = useLocation();
  const isGoToChartsPage =
    pathname.startsWith(routes.chartspage) &&
    pathname.length > routes.chartspage.length;
  const showMobileMenu = useCallback(() => {
    if (navMenu.current) {
      navMenu.current.style.marginLeft = "0";
    }
  }, [navMenu]);
  const closeMobileMenu = useCallback(() => {
    if (window.innerWidth >= BREAKPOINT_WIDTH) {
      return;
    }
    if (navMenu.current) {
      navMenu.current.style.marginLeft = "-100%";
    }
  }, [navMenu]);
  const gettingChartsHandler = useCallback(() => {
    if (isChartSocketLoading) {
      return;
    }
    dispatch(setChartSocketLoading(true));
    const isGettingCharts = !!getSocketStatus();
    if (isGettingCharts) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  }, [isChartSocketLoading, dispatch]);

  const isGettingCharts = !!getSocketStatus();
  const chartsStatusBtnText = isGettingCharts
    ? "Stop getting charts"
    : "Start getting charts";
  return (
    <div className={classes.MainLayout}>
      <aside className={classes.MainLayout__navbar}>
        <div className={classes.MainLayout__navbar_menublock}>
          <div className={classes.menuicon} onClick={showMobileMenu}>
            <BurgerIon />
          </div>
          {isGoToChartsPage && (
            <NavLink
              className={classes.MainLayout__navbar_backBtn}
              to={routes.chartspage}
            >
              Go to charts
            </NavLink>
          )}
        </div>

        <nav className={classes.MainLayout__navbar_nav} ref={navMenu}>
          <CloseIcon onClick={closeMobileMenu} className={classes.closeicon} />
          <NavLink to={routes.homepage} onClick={closeMobileMenu}>
            Home
          </NavLink>
          <div className={classes.chartslinkblock} onClick={closeMobileMenu}>
            <NavLink to={routes.chartspage}>Charts</NavLink>
            {(pathname === routes.chartspage || isGoToChartsPage) && (
              <ChartTypeOptions />
            )}
          </div>
          <div
            className={classes.chartsStatusBtn}
            data-isgettinggharts={isGettingCharts}
            onClick={gettingChartsHandler}
          >
            <span>{chartsStatusBtnText}</span>
            {isChartSocketLoading && (
              <div className={classes.chartsStatusBtn__spinnerWrap}>
                <Spinner />
              </div>
            )}
          </div>
        </nav>
      </aside>
      <aside className={classes.MainLayout__content}>{children}</aside>
    </div>
  );
};

export default MainLayout;
