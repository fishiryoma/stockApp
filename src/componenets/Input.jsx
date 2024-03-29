import { twMerge } from "tailwind-merge";

function Input({
  label,
  type,
  value,
  placeholder,
  pattern,

  inputClassName,
  labelClassName,
  wrapClassName,
  ...rest
}) {
  const inputClass = twMerge(
    "py-1.5 px-3.5 rounded-md placeholder:text-slate-400 block bg-white w-full border border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1",
    inputClassName
  );
  const labelClass = twMerge("mb-1.5 block text-white", labelClassName);
  const wrapClass = twMerge("my-4", wrapClassName);

  return (
    <div className={wrapClass}>
      <label className={labelClass}>{label}</label>
      <input
        className={inputClass}
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        pattern={pattern || null}
        {...rest}
      />
    </div>
  );
}

export default Input;
