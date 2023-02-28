import { useRef, useCallback, FC } from "react";
import classes from "./MainLayoutMob.module.scss";
import { NavLink } from "react-router-dom";
import routes from "../../../../routes";
import { ReactComponent as BurgerIon } from "../../../../assets/icons/burger_icon.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close_icon.svg";

const MainLayoutMob: FC = () => {
  const navMenu = useRef<HTMLDivElement | null>(null);
  const showMobileMenu = useCallback(() => {
    if (navMenu.current) {
      navMenu.current.style.marginLeft = "0";
    }
  }, [navMenu]);
  const closeMobileMenu = useCallback(() => {
    if (navMenu.current) {
      navMenu.current.style.marginLeft = "-100%";
    }
  }, [navMenu]);
  return (
    <div className={classes.MainLayoutMob}>
      <div className={classes.MainLayoutMob__menuicon} onClick={showMobileMenu}>
        <BurgerIon />
      </div>
      <nav className={classes.MainLayoutMob__nav} ref={navMenu}>
        <CloseIcon onClick={closeMobileMenu} />
        <NavLink to={routes.homepage} onClick={closeMobileMenu}>
          Home
        </NavLink>
        <NavLink to={routes.chartspage} onClick={closeMobileMenu}>
          Charts
        </NavLink>
      </nav>
    </div>
  );
};

export default MainLayoutMob;
