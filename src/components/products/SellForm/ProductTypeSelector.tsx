import { useEffect, useState } from "react";
import { DigitalProductTypes } from "./config";
import { ProductTypeIcon } from "./icons";
import { twMerge } from "tailwind-merge";

export const ProductTypeSelector = ({
  className,
  setProductFormat,
}: {
  className: string;
  setProductFormat: (p: string) => void;
}) => {
  let productList = DigitalProductTypes;
  const configType = "digital";
  switch (configType) {
    case "digital": {
      productList = DigitalProductTypes;
      break;
    }
    // case "physical": {
    //   productList = PhysicalProductTypes;
    //   break;
    // }
    // case "event": {
    //   productList = EventProductTypes;
    // }
  }

  const [selectedMetaProduct, setselectedMetaProduct] = useState<
    string | undefined
  >();

  useEffect(() => {
    setProductFormat(selectedMetaProduct || "");
  }, [selectedMetaProduct]);

  return (
    <div
      className={twMerge(
        "flex gap-2 flex-col rounded-lg w-fit min-h-[32px] bg-[#2E2F32] p-2",
        className
      )}
    >
      <div className="flex gap-1 flex-wrap w-full">
        <ProductTypeIcon />
        {!selectedMetaProduct ? (
          <p className="text-xs font-groteskRegular text-cultureBeige">
            Select Product Type
          </p>
        ) : (
          <div>
            {productList
              .filter((ele) => ele.title == selectedMetaProduct)
              .map((prd, key) => {
                const Icon = prd.icon;
                return (
                  <span
                    onClick={() => {
                      setselectedMetaProduct(undefined);
                    }}
                    style={{
                      boxShadow: "0px 0px 4px 0px #5F5F5F",
                    }}
                    className="flex p-2 rounded-lg items-center text-xs capitalize gap-1 "
                    key={prd.title + key}
                  >
                    <Icon />
                    <p
                      style={{
                        color: prd.color,
                      }}
                    >
                      {prd.title}
                    </p>
                  </span>
                );
              })}
          </div>
        )}
      </div>
      {!selectedMetaProduct && (
        <div className="flex gap-2">
          {productList.map((pt, key) => {
            const Icon = pt.icon;
            return (
              <span
                onClick={() => {
                  setselectedMetaProduct(pt.title);
                }}
                style={{
                  boxShadow: "0px 0px 4px 0px #5F5F5F",
                }}
                className="flex p-2 rounded-lg items-center text-xs capitalize gap-1"
                key={pt.title + key}
              >
                <Icon />
                <p
                  style={{
                    color: pt.color,
                  }}
                >
                  {pt.title}
                </p>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
