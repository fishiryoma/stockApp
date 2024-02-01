import { twMerge } from "tailwind-merge";
import classNames from "classnames";

function Button({ text, buttonClass, ...rest }) {
  const classes = twMerge(
    classNames(
      "rounded-md py-1 px-3.5 shadow text-white bg-transparent",
      buttonClass
    )
  );

  return (
    <button className={classes} {...rest}>
      {text}
    </button>
  );
}

export default Button;
