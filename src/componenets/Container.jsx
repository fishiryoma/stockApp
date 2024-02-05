import { twMerge } from "tailwind-merge";

function FormContainer({ children, className }) {
  const classes = twMerge(
    "container w-full md:w-1/3 lg:w-1/4 bg-slate-50 mx-auto py-6 px-6 rounded-md shadow-md",
    className
  );
  return <div className={classes}>{children}</div>;
}

function TableContainer({ children, tableClass }) {
  const classes = twMerge("w-full", tableClass);
  return <div className={classes}>{children}</div>;
}

function Container({ children, className }) {
  const classes = twMerge("py-10 px-3 md:px-6 flex-grow", className);

  return <div className={classes}>{children}</div>;
}

export { Container, FormContainer, TableContainer };
