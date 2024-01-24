function AuthContainer({ children }) {
  return (
    <div className="container w-full md:w-1/3 lg:w-1/4 bg-slate-50 mx-auto py-6 px-6 rounded-md shadow-md">
      {children}
    </div>
  );
}

function TableContainer({ children }) {
  return <div className="container w-full lg:w-1/2">{children}</div>;
}

function Container({ children }) {
  return <div className="mt-10 px-6">{children}</div>;
}

export { Container, AuthContainer, TableContainer };
