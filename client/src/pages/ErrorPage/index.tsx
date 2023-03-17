import classes from "./ErrorPage.module.scss";
import { NavLink } from "react-router-dom";
import routes from "../../routes";

const ErrorPage = () => {
  return (
    <div className={classes.ErrorPage}>
      <p>Page not found</p>
      <NavLink to={routes.homepage} className={classes.ErrorPage__btn}>
        Go home
      </NavLink>
    </div>
  );
};

export default ErrorPage;
