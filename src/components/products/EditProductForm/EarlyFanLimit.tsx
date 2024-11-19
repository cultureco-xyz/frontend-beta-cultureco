import { twMerge } from "tailwind-merge";

const cultureOrange = "#FE621D";

export const EarlyFanLimit = ({
  selectedDay,
  setselectedDay,
  className,
}: {
  selectedDay: number;
  setselectedDay: (day: number) => void;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col mt-2 font-groteskMedium text-cultureWhite",
        className
      )}
    >
      <p className="text-xs">Early Fan Time Limit:</p>
      <span className="flex gap-3 mt-1 ">
        {[1, 2, 3].map((days, id) => {
          return (
            <span
              key={id + "day"}
              onClick={() => {
                setselectedDay(days);
              }}
              className="flex flex-col items-center cursor-pointer"
            >
              <span
                style={{
                  background: selectedDay == days ? cultureOrange : "",
                }}
                key={id + days + "days"}
                className="flex  border-[1px] border-cultureOrange w-[37px] h-[37px] rounded justify-center items-center"
              >
                <p className="text-xs">{days}</p>
              </span>
              {days > 1 ? (
                <p className="text-xs mt-[0.2px]">Days</p>
              ) : (
                <p className="text-xs mt-[0.2px]">Day</p>
              )}
            </span>
          );
        })}
      </span>
      <p className="opacity-[0.5] text-xs">
        For what amount of time can a user get the early fan edition?
      </p>
    </div>
  );
};
