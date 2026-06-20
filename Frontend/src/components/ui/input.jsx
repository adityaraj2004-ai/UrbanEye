import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Input = React.forwardRef(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-light text-neutral-300"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          aria-invalid={error ? true : undefined}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-white shadow-sm transition-colors",
            "placeholder:text-neutral-500",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5E9D7]/40 focus-visible:border-[#F5E9D7]/30",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500/50 focus-visible:ring-red-500/30"
              : "border-white/10 hover:border-white/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
