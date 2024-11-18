const StockLimit = ({
  limit,
  setLimit,
  title,
}: {
  limit: number;
  setLimit: (size: number) => void;
  title?: string;
}) => {
  return (
    <div className="flex flex-col mt-2 font-groteskMedium text-cultureWhite">
      <p className="text-xs">{title ? title : "Stock limit"}</p>
      <span className="flex gap-1 text-white">
        <input
          value={limit == 0 ? undefined : limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
          }}
          className="border-[1px] border-cultureOrange w-[60px] h-[37px] rounded bg-transparent mt-1 px-1"
          min={0}
          type="number"
        />
        <p className="text-xs mt-auto opacity-[0.7]">No.s</p>
      </span>
      <p className="opacity-[0.5] text-xs mt-1">How many will be available ?</p>
    </div>
  );
};

export { StockLimit };
