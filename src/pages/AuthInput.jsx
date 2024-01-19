function AuthInput({
  label,
  type,
  value,
  placeholder,
  pattern,
  onChange,
  ...rest
}) {
  return (
    <div className="my-4">
      <label className="text-xs mb-1.5 block">{label}</label>
      <input
        className="py-1.5 px-3.5 rounded-md placeholder:text-slate-400 block bg-white w-full border border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xs"
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        pattern={pattern || null}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
    </div>
  );
}

export default AuthInput;
