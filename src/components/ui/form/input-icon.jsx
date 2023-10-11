import cn from "classnames";
import React from "react";

const classes = {
  root: "py-2 pl-10 pr-4 w-full appearance-none transition duration-150 ease-in-out text-13px lg:text-sm min-h-12 transition duration-200 ease-in-out rounded-sm ",
  normal:
    "bg-gray-100 border-gray-300 focus:shadow focus:bg-fill focus:border-primary",
  outline: "border border-golden focus:border-golden",
};
const InputIcon = React.forwardRef(
  (
    {
      className = "block",
      label,
      name,
      error,
      placeholder,
      variant = "normal",
      shadow = false,
      type = "text",
      inputClassName,
      labelClassName,
      iconClass,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.outline]: variant === "outline",
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={`block font-normal text-sm leading-none mb-3 cursor-pointer ${
              labelClassName || "text-base text-opacity-70"
            }`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={rootClassName}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={iconClass}></i>
          </div>
        </div>
        {error && <p className="my-2 text-[13px] text-rose-600">{error}</p>}
      </div>
    );
  }
);

export default InputIcon;
