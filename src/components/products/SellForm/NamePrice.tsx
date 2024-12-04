import CultureCoLogoIcon from "@/assets/svgs/culture-logo.icon";
import { twMerge } from "tailwind-merge";

const NamePrice = ({
  name,
  setName,
  memberPrice,
  setMemberPrice,
  regularPrice,
  setRegularPrice,
  className,
  membersOnly,
}: {
  name: string;
  setName: (n: string) => void;
  memberPrice: number;
  setMemberPrice: (n: number) => void;
  regularPrice: number;
  setRegularPrice: (n: number) => void;
  className?: string;
  membersOnly: boolean;
}) => {
  return (
    <div className={twMerge("flex w-full", className)}>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="border-white text-white border-[1px] h-fit mt-auto font-groteskBold bg-transparent rounded p-1 text-xl placeholder:text-white w-[180px]"
        type="text"
        placeholder="Name your product"
      />
      <span className="flex flex-col gap-1 ml-auto">
        <label className="flex items-center gap-[2.5px]" htmlFor="">
          <CultureCoLogoIcon fillColor="#fe621d" size={20} />
          <p className="text-2xl text-cultureOrange">₹</p>
          <input
            className="border-cultureOrange text-cultureOrange border-[1px] font-groteskBold bg-transparent rounded p-1 text-xl placeholder:text-cultureOrange w-[80px]"
            min={0}
            type="number"
            placeholder="0000"
            onChange={(e) => {
              setMemberPrice(Number(e.target.value));
            }}
            value={memberPrice == 0 ? undefined : memberPrice}
          />
        </label>
        {!membersOnly && (
          <>
            <label
              className="flex items-center ml-auto gap-[2.5px] mt-1"
              htmlFor=""
            >
              <p className="text-md text-white">₹</p>
              <input
                className="border-white text-white border-[1px] font-groteskBold bg-transparent rounded p-1 text-md placeholder:text-white h-[28px] w-[60px] "
                min={0}
                type="number"
                placeholder="0000"
                onChange={(e) => {
                  setRegularPrice(Number(e.target.value));
                }}
                value={regularPrice == 0 ? undefined : regularPrice}
              />
            </label>
            <p className="font-groteskRegular text-xs text-white">
              for non-members
            </p>
          </>
        )}
      </span>
    </div>
  );
};

export default NamePrice;
