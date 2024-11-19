import { useEffect, useState, useRef } from "react";
import {
  DigitalProductTypes,
  EventProductTypes,
  PhysicalProductTypes,
} from "./config";
import { ProductTypeIcon } from "./icons";
import { twMerge } from "tailwind-merge";

export const ProductTypeSelector = ({
  className,
  setProductFormat,
  configType,
  selectedProductFormat, // Passed as prop to initialize selectedMetaProduct
}: {
  className: string;
  setProductFormat: (p: string) => void;
  configType: "digital" | "physical" | "event";
  selectedProductFormat: string;
}) => {
  let productList = DigitalProductTypes;
  switch (configType) {
    case "digital":
      productList = DigitalProductTypes;
      break;
    case "physical":
      productList = PhysicalProductTypes;
      break;
    case "event":
      productList = EventProductTypes;
      break;
  }

  // Ref to track the initial value of selectedMetaProduct to avoid resetting it unnecessarily
  const initialProductRef = useRef<string | undefined>(selectedProductFormat);

  // State for selected product type
  const [selectedMetaProduct, setselectedMetaProduct] = useState<string | undefined>(initialProductRef.current);

  // Effect to set the initial value when entering edit mode or configType changes
  useEffect(() => {
    if (selectedProductFormat !== selectedMetaProduct) {
      setselectedMetaProduct(selectedProductFormat); // Only update when product format prop changes
    }
  }, [selectedProductFormat]);

  // Effect to update the parent state when selectedMetaProduct changes
  useEffect(() => {
    if (selectedMetaProduct !== undefined) {
      setProductFormat(selectedMetaProduct); // Pass the selected value to the parent
    }
  }, [selectedMetaProduct, setProductFormat]);

  // Handle edit action: Update state or show form based on the current state
  const handleEdit = () => {
    setselectedMetaProduct(selectedProductFormat); // Ensure selected value is set for editing
  };

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
              .filter((ele) => ele.title === selectedMetaProduct)
              .map((prd, key) => {
                const Icon = prd.icon;
                return (
                  <span
                    onClick={() => {
                      setselectedMetaProduct(undefined); // Reset selection when clicked
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
                  setselectedMetaProduct(pt.title); // Set the product when clicked
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
