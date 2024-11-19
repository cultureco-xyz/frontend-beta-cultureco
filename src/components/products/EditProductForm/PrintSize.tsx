type PrintSize = "A4" | "A3" | "A2" | "Other";
const cultureOrange = "#FE621D";

const PrintSize = ({
  selectedSize,
  setSelectedSize,
}: {
  selectedSize: PrintSize;
  setSelectedSize: (size: PrintSize) => void;
}) => {
  const getRelativeSize = (
    size: PrintSize
  ): { h: number; w: number; color: string } => {
    const actualSizes: Record<
      PrintSize,
      { h: number; w: number; color: string }
    > = {
      A4: { w: 21, h: 29, color: "#2E2F32" },
      A3: { w: 29, h: 42, color: "#444548" },
      A2: { w: 42, h: 59, color: "#58595B" },
      Other: { w: 0, h: 0, color: "" },
    };

    const { h, w, color } = actualSizes[size];

    return {
      h,
      w,
      color: color,
    };
  };

  return (
    <div className="flex flex-col mt-2 font-groteskMedium text-cultureWhite">
      <p className="text-xs">Select size:</p>
      <div className="flex justify-between">
        <span className="flex gap-3 mt-1">
          {(["A4", "A3", "A2", "Other"] as PrintSize[]).map((size, id) => (
            <span
              key={id + "size"}
              onClick={() => setSelectedSize(size)}
              className="flex flex-col items-center cursor-pointer"
            >
              <span
                style={{
                  background: selectedSize === size ? cultureOrange : "",
                }}
                className="flex border-[1px] border-cultureOrange w-[37px] h-[37px] rounded justify-center items-center"
              >
                <p className="text-xs">{size == "Other" ? "X" : size}</p>
              </span>

              <p className="text-xs mt-[0.2px]">{size}</p>
            </span>
          ))}
        </span>

        <span className="flex items-baseline">
          {(["A4", "A3", "A2"] as PrintSize[]).map((size, id) => {
            const { h, w, color } = getRelativeSize(size);

            return (
              <span
                key={id + "day"}
                style={{
                  height: `${h}px`,
                  width: `${w}px`,
                  background: selectedSize == size ? "#FE621D" : color,
                  transform: `translate(${id * 10}px,`,
                }}
                className="flex cursor-pointer bg-yellow-200 rounded-[4px] "
              ></span>
            );
          })}
        </span>
      </div>
      <p className="opacity-[0.5] text-xs">
        What sheet size will the print be?
      </p>
    </div>
  );
};

export { PrintSize };
