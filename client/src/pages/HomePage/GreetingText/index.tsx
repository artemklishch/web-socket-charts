import { FC } from "react";
import classes from "./GreetingText.module.scss";

const GreetingText: FC = () => {
  return (
    <div className={classes.GreetingText}>
      <svg
        width="290"
        height="270"
        viewBox="0 0 290 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.GreetingText__greeting}
      >
        {/*Welcome*/}
        <path
          d="M20,20 C25,100 35,30 38,30 S40,100 60,20"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M70,40 100,40 C105,40 85,10 70,40 C60,80 120,40 85,55"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M115,15 115,60"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M150,30 C125,25 125,65 150,55"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M180,32 Q168,30 165,38 T168,53 185,50 C186,45 188,40 180,32"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M200,30 200,58 C210,30 215,10 215,60 C230,-10 235,60 230,55"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M245,40 275,40 C275,20 245,25 245,40 Q245,55 270,55"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>

        {/* to */}
        <path
          d="M115,80 C115,80 110,140 125,120 M105,90 125,90"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M150,97 Q138,95 135,103 T138,118 155,115 C156,110 158,105 150,97"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>

        {/*beautiful*/}
        <path
          d="M20,140 20,190 M20,160 Q55,180 20,190"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M50,170 80,170 C85,170 65,140 50,170 Q50,185 75,185"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M95,150 Q120,150 115,190 M110,165 Q70,190 115,185"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M130,155 C120,200 150,200 150,150 V155,188"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M170,145 C170,145 165,205 175,185 M160,155 180,155"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M192,155 192,190 M192,140 192,140"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M225,140 C205,140 215,140 213,190 M205,160 220,160"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M235,155 C225,200 255,200 255,150 V155,188"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M270,140 270,188"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>

        {/*charts*/}
        <path
          d="M70,220 C45,215 45,255 70,245"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M85,200 C85,330 90,150 108,248"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M125,210 Q150,210 145,250 M140,225 Q100,250 145,245"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M160,210 C160,310 165,170 180,220"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M200,205 C200,205 195,265 205,245 M190,215 210,215"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
        <path
          d="M245,220 C245,210 235,210 225,220 S225,230 240,235 S240,255 225,250"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};

export default GreetingText;
