import { formatDateAndTime } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DateTimeState {
  monthName: string;
  day: string;
  year: string;
  hours: string;
  minutes: string;
  ampm: string;
}

function DatePicker({
  savedateTime,
  className,
}: {
  savedateTime: (dt: string) => void;
  className?: string;
}) {
  const [dateTime, setdateTime] = useState("");
  const [splitdateTime, setsplitDateTime] = useState<DateTimeState>({
    monthName: "",
    day: "",
    year: "",
    hours: "",
    minutes: "",
    ampm: "AM",
  });

  useEffect(() => {
    // Call the formatDateAndTime function with the current date string
    const currentDate = new Date().toISOString(); // Get current date in ISO format
    const formatted = formatDateAndTime(currentDate);
    setsplitDateTime({
      monthName: `${formatted.monthName}`,
      day: `${formatted.day}`,
      year: `${formatted.year}`,
      hours: `${formatted.hours}`,
      minutes: `${formatted.minutes}`,
      ampm: `${formatted.ampm}`,
    });
  }, []);

  useEffect(() => {
    if (dateTime) {
      savedateTime(dateTime);
      const formatted = formatDateAndTime(dateTime);
      setsplitDateTime({
        monthName: `${formatted.monthName}`,
        day: `${formatted.day}`,
        year: `${formatted.year}`,
        hours: `${formatted.hours}`,
        minutes: `${formatted.minutes}`,
        ampm: `${formatted.ampm}`,
      });
    }
  }, [dateTime]);

  return (
    <label
      className={twMerge(
        "flex w-[134px]  h-[34px] gap-2 mt-3 text-cultureWhite z-50",
        className
      )}
      htmlFor="dt-picker"
      onClick={() => {
        try {
          //@ts-expect-error // showPicker is available on the queryselctor for datepicker
          document?.querySelector("#dt-picker")?.showPicker();
        } catch (er) {
          console.log(er);
        }
      }}
    >
      <input
        className="absolute opacity-0 bottom-0 left-0"
        id="dt-picker"
        type="datetime-local"
        onChange={(e) => {
          setdateTime(`${e.target.value}`);
        }}
      />
      <span className="flex gap-1 w-[56px] h-[31px] rounded-sm border-white border justify-center items-center font-groteskBold">
        <p className="text-[20px] font-medium">{splitdateTime.day}</p>
        <span className="flex flex-col items-end">
          <p className="text-[10px] leading-[5px] uppercase font-bold mt-1">
            {splitdateTime.monthName}
          </p>
          <p className="text-[8px] leading-3">{splitdateTime.year}</p>
        </span>
      </span>
      <span className="w-[56px] gap-[2px] h-[31px] rounded-sm border-white border flex justify-center items-center font-groteskBold">
        <p className="text-[20px] font-medium">{splitdateTime.hours}</p>
        <p>:</p>
        <span className="flex flex-col justify-end ">
          <p className="text-[10px] leading-[8px]">{splitdateTime.minutes}</p>
          <p className=" text-[8px] leading-[8px]">{splitdateTime.ampm}</p>
        </span>
      </span>
    </label>
  );
}

export default DatePicker;
