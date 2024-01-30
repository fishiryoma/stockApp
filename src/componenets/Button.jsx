import { twMerge } from "tailwind-merge";
import classNames from "classnames";

function Button({ text, buttonClass }) {
  const classes = twMerge(
    classNames(
      "rounded-md py-1 px-3.5 shadow text-white bg-transparent",
      buttonClass
    )
  );

  return <button className={classes}>{text}</button>;
}

export default Button;
