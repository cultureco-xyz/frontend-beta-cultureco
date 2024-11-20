import { Textarea } from "@/components/ui/textarea";
import { twMerge } from "tailwind-merge";

export const Description = ({
  description,
  setDescription,
  className,
}: {
  description: string;
  setDescription: (desc: string) => void;
  className?: string;
}) => {
  return (
    <label className={twMerge("text-white", className)} htmlFor="">
      <p className="text-xs">Description</p>
      <Textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Describe your product"
        className="text-sm mt-2 border-cultureOrange placeholder:opacity-[0.5]"
      ></Textarea>
      <p className="opacity-[0.5] text-xs">
        The best descriptions are short and brief.
      </p>
    </label>
  );
};
