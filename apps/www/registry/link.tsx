import { tv } from "tailwind-variants";

export const styleLink = tv({
  base: [
    "relative inline-flex items-center gap-1 [&_a]:no-underline rounded-sm cursor-pointer",
    "before:absolute before:bottom-[-1px] before:left-[-2px] before:w-[calc(100%+4px)] before:h-[1px] before:bg-sand-800",
    "[&_a]:focus:outline-none",
    // "has-[:focus]:ring-2 ring-offset-2 ring-blue-500",
    "has-[:focus]:outline-2 has-[:focus]:outline-offset-2 has-[:focus]:outline-blue-500",
    // hover
    "hover:bg-olive-300 hover:ring-6 hover:ring-olive-300",
  ],
  variants: {
    variant: {
      default: "border-black",
      primary: "border-blue-500",
    },
  },
});

export const LinkStyle = ({
  children,
  className,
}: React.ComponentProps<"span">) => {
  return (
    <span className={styleLink({ variant: "default", className })}>
      {children}
    </span>
  );
};
