import { FC, useCallback, useEffect, useRef } from "react";
import { FieldProps } from "formik";
import classes from "./TextArea.module.scss";

const LINE_HEIGHT = 35;

const TextArea: FC<FieldProps> = ({ field }) => {
  const texareaRef = useRef<HTMLTextAreaElement | null>(null);
  const setTextareaHeight = useCallback(() => {
    const textarea = texareaRef.current!;
    textarea.style.height = "0px";
    const dif = textarea.scrollHeight - textarea.clientHeight;
    if (dif) {
      if (isNaN(parseInt(textarea.style.height))) {
        textarea.style.height = textarea.scrollHeight + LINE_HEIGHT + "px";
      } else {
        textarea.style.height =
          parseInt(textarea.style.height) + dif + LINE_HEIGHT + "px";
      }
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setTextareaHeight);
    return () => {
      window.removeEventListener("resize", setTextareaHeight);
    };
  }, [setTextareaHeight]);
  useEffect(() => {
    setTextareaHeight();
  }, [field.value, setTextareaHeight]);
  return (
    <div className={classes.TextArea}>
      <textarea
        ref={texareaRef}
        className={classes.TextArea__textfield}
        {...field}
      ></textarea>
    </div>
  );
};

export default TextArea;
