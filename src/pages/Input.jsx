import { twMerge } from "tailwind-merge";
import classNames from "classnames";

function Input({
  label,
  type,
  value,
  placeholder,
  pattern,
  onChange,
  inputClassName,
  labelClassName,
  wrapClassName,
  ...rest
}) {
  const inputClass = twMerge(
    classNames(
      "py-1.5 px-3.5 rounded-md placeholder:text-slate-400 block bg-white w-full border border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xs",
      inputClassName
    )
  );
  const labelClass = twMerge(
    classNames("text-xs mb-1.5 block", labelClassName)
  );
  const wrapClass = twMerge(classNames("my-4"), wrapClassName);

  return (
    <div className={wrapClass}>
      <label className={labelClass}>{label}</label>
      <input
        className={inputClass}
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

export default Input;
