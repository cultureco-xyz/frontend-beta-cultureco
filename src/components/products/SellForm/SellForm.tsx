import React, { useState } from "react";
import { Digital, Physical, Event } from "./icons";
import { ChevronLeft } from "lucide-react";
import { TProductTabs } from "./config";
import { motion } from "framer-motion";
import DigitalForm from "./forms/DigitalForm";
import PhysicalForm from "./forms/PhysicalForm";
import EventForm from "./forms/EventForm";

export const ProductTabs = [
  { title: "digital", icon: Digital },
  { title: "physical", icon: Physical },
  { title: "event", icon: Event },
];

function SellForm({ close }: { close: () => void }) {
  const [productType, setProductType] = useState<TProductTabs>(
    TProductTabs.DIGITAL
  );

  return (
    <motion.div
      initial={{
        y: 300,
      }}
      animate={{
        y: 0,
        transition: {
          duration: 0.3,
        },
      }}
      className="flex overflow-y-auto flex-col pt-4 w-full max-w-mobile mb-[56px] max-h-[86%]  h-fit rounded-t-xl shadow-2xl bg-cultureGray absolute bottom-0 z-50 px-4"
    >
      <span
        className="flex w-full text-white"
        onClick={() => {
          close();
        }}
      >
        <span
          onClick={() => {
            close();
          }}
          className="flex items-center h-fit text-base cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </span>
      </span>
      <div className="bg-[#2E2F32] mt-4 mb-4 flex w-full min-h-[34px] rounded-[8px] overflow-hidden h-min">
        {[
          { title: "digital", icon: Digital },
          { title: "physical", icon: Physical },
          { title: "event", icon: Event },
        ].map((btn) => {
          const Icon = btn.icon;
          return (
            <span
              onClick={() => [setProductType(btn.title as TProductTabs)]}
              style={
                productType == btn.title
                  ? { background: "#FE621D", color: "#282B28" }
                  : { color: "white" }
              }
              key={btn.title}
              className="w-full cursor-pointer text-sm capitalize gap-2 text-cultureOrange flex justify-center items-center"
            >
              <Icon fill={productType == btn.title ? "#282B28" : ""} />
              {btn.title}
            </span>
          );
        })}
      </div>
      {productType == TProductTabs.DIGITAL && <DigitalForm />}
      {productType == TProductTabs.PHYSICAL && <PhysicalForm />}
      {productType == TProductTabs.EVENT && <EventForm />}
    </motion.div>
  );
}

export default SellForm;
