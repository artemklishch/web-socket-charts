import classes from "./HomePage.module.scss";
import ImageBgc from "../../assets/images/chart_image.png";
import {useEffect} from 'react'

import GreetingText from "./GreetingText";

const HomePage = () => {
  useEffect(() => {
    console.log("homepage");
  }, []);
  return (
    <div className={classes.HomePage}>
      <img
        src={ImageBgc}
        alt="ImageBgc"
        className={classes.HomePage__imageBgc}
      />
      <GreetingText />
    </div>
  );
};

export default HomePage;
