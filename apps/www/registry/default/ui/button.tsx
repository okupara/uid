import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={cn(
        // base
        "relative min-w-[50px] h-9 rounded-[8px] text-background font-medium",
        // inline layout
        "flex items-center justify-center",
        // effects
        "bg-[linear-gradient(145deg,#333333,#222222)] hover:bg-[linear-gradient(145deg,#555555,#333333)]",
        // "shadow-[0_3px_0_#151515,0_0_10px_rgba(0,0,0,0.3)]",
        "shadow-[0_2px_0_#151515,0_0_10px_rgba(0,0,0,0.3)]",
        // pseudo before content's layout
        "before:content-[''] before:absolute before:inset-0 rounded-[8px]",
        // pseudo before content's effects
        "before:bg-[linear-gradient(145deg,rgba(255,255,255,0.1),transparent)]",
        className
      )}
    >
      {children}
    </button>
  );
};
