import { twMerge } from "tailwind-merge";
import classNames from "classnames";

function Button({ text, buttonClass }) {
  const classes = twMerge(
    classNames(
      "rounded-md py-1 px-3.5 text-xs shadow text-white bg-sky-400 hover:bg-sky-500",
      buttonClass
    )
  );

  return <button className={classes}>{text}</button>;
}

export { Button };
