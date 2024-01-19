function AuthContainer({ children }) {
  return (
    <div className="container w-full max-w-64 bg-slate-50 mx-auto py-4 px-6 rounded-md shadow-md">
      {children}
    </div>
  );
}

function AuthButton({ text, onClick, bgColor, hover, textColor }) {
  return (
    <button
      className={`rounded-md   py-1 px-3.5 text-xs shadow 
      ${textColor || "text-white"}
      ${bgColor || "bg-sky-400"} ${hover || "hover:bg-sky-500"}
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export { AuthContainer, AuthButton };
