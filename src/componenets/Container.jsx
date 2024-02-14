import { twMerge } from "tailwind-merge";

function FormContainer({ children, className }) {
  const classes = twMerge(
    "container w-full max-w-md bg-slate-50 mx-auto py-6 px-6 rounded-md shadow-md bg-opacity-95",
    className
  );
  return <div className={classes}>{children}</div>;
}

function TableContainer({ children, tableClass }) {
  const classes = twMerge("w-full", tableClass);
  return <div className={classes}>{children}</div>;
}

function Container({ children, className }) {
  const classes = twMerge("py-10 px-4 md:px-6 flex-grow mt-[68px] ", className);

  return <div className={classes}>{children}</div>;
}

export { Container, FormContainer, TableContainer };
