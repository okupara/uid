import { cn } from "@/lib/utils";

export type FormContentLayout = React.ComponentProps<"div"> & {
  iconRender: React.ReactNode;
  titleRender: React.ReactNode;
  formRender: ({
    RootLayout,
    ItemLayout,
  }: {
    RootLayout: (props: React.ComponentProps<"div">) => React.ReactNode;
    ItemLayout: (props: React.ComponentProps<"div">) => React.ReactNode;
  }) => React.ReactNode;
  footerRender: React.ReactNode;
};

export const FormContentLayout = ({
  iconRender,
  titleRender,
  formRender,
  footerRender,
}: FormContentLayout) => {
  return (
    <div className="min-w-[400px] flex bg-olive-150 px-2 flex-col rounded-2xl">
      <div
        data-part="title"
        className={cn("flex flex-col p-4 relative items-center justify-center")}
      >
        <div>
          <div
            className={cn(
              "absolute top-[-40px] left-[calc(50%-40px)] h-[70px] w-[80px] bg-olive-150 rounded-full",
              // before content
              "before:content-[''] before:absolute before:top-[calc(50%-18px)] before:right-[-22px] before:w-[24px] before:h-[24px] before:rounded-full before:shadow-[-10px_10px_0_#fff]",
              // debug
              "before:bg-[#eff1ef]",
              // go
              "before:bg-transparent before:shadow-[-10px_10px_0_#eff1ef]",
              // before content
              "after:content-[''] after:absolute after:top-[calc(50%-18px)] after:left-[-22px] after:w-[24px] after:h-[24px] after:rounded-full after:shadow-[10px_10px_0_#fff]",
              // debug
              "after:bg-[#eff1ef]",
              // go
              "after:bg-transparent after:shadow-[10px_10px_0_#eff1ef]"
            )}
          />
          <div
            className={cn([
              "absolute top-[-24px] left-[calc(50%-15px)] w-[30px] h-[30px]",
            ])}
          >
            {iconRender}
          </div>
        </div>
        <h2 className="font-semibold text-lg z-10">{titleRender}</h2>
      </div>
      <div data-part="body" className="bg-sand-50 p-8 rounded-xl shadow-sm">
        {formRender({ RootLayout, ItemLayout })}
      </div>
      <div data-part="footer" className="p-4 flex justify-center text-sm">
        {footerRender}
      </div>
    </div>
  );
};

export const RootLayout = ({
  children,
  className,
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {children}
    </div>
  );
};

export const ItemLayout = ({
  children,
  className,
}: React.ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
};
