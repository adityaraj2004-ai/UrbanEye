import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5E9D7]/40 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#F5E9D7] text-[#0B0B0B] shadow hover:bg-[#F5E9D7]/90",
        filled:
          "bg-[#F5E9D7] text-[#0B0B0B] shadow hover:bg-[#F5E9D7]/90",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-600/90",
        outline:
          "border border-white/10 bg-transparent text-white shadow-sm hover:bg-white/5",
        secondary:
          "bg-white/10 text-white shadow-sm hover:bg-white/15",
        ghost: "text-white hover:bg-white/5",
        link: "text-[#F5E9D7] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
