function AuthContainer({ children }) {
  return (
    <div className="container w-full max-w-64 bg-slate-50 mx-auto py-4 px-6 rounded-md shadow-md">
      {children}
    </div>
  );
}

export { AuthContainer };
