import React, { useEffect, useState } from "react";
import { Digital, Physical, Event } from "./icons";
import { ChevronLeft } from "lucide-react";
import DigitalFrame from "./frames/DigitalFrame";
import { Button } from "@/components/ui/button";
import { ProductTypeSelector } from "./ProductTypeSelector";
import NamePrice from "./NamePrice";
import { MemberSwitch } from "./MemberSwitch";
import { Description } from "./Description";
import { EarlyFanLimit } from "./EarlyFanLimit";
import { Collaborator } from "./Collaborator";
import ImageUpload from "./ImageUpload";
import { create } from "zustand";
import { TDigitalProductFormats, TProductTabs } from "./config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/components/common/spinner";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import { motion } from "framer-motion";

interface Store {
  title: string;
  description: string;
  productType: string;
  collaborator: string;
  productFormat: string;
  imageURL: string;
  creator: string;
  membersOnly: boolean;
  regularPrice: number;
  memberPrice: number;
  fanlimit: number;
}

interface storeType extends Store {
  setStoreValue: (key: keyof Store, value: string | number | boolean) => void;
}

const initialState: Store = {
  title: "",
  description: "",
  productType: TProductTabs.DIGITAL,
  productFormat: TDigitalProductFormats.DIGITAL_ART,
  imageURL: "",
  creator: "",
  membersOnly: false,
  regularPrice: 0,
  memberPrice: 0,
  fanlimit: 1,
  collaborator: "",
};

const useStore = create<storeType>()((set) => ({
  ...initialState,
  setStoreValue: (key: keyof Store, value: string | number | boolean) => {
    return set({ [key]: value });
  },
}));

export const ProductTabs = [
  { title: "digital", icon: Digital },
  { title: "physical", icon: Physical },
  { title: "event", icon: Event },
];

function SellForm({ close }: { close: () => void }) {
  const [productType] = useState<TProductTabs>(TProductTabs.DIGITAL);
  const store = useStore();
  const user = useAuthContext();
  console.log(store);

  useEffect(() => {
    //reset state
    Object.keys(initialState).map((ele) => {
      store.setStoreValue(ele as keyof Store, initialState[ele as keyof Store]);
    });
  }, []);

  const saveProduct = useMutation({
    mutationKey: ["save-product"],
    mutationFn: async () => {
      const res = await axios.post("/backend/product/save-product", {
        title: store.title,
        description: store.description,
        productType: store.productType,
        productFormat: store.productFormat,
        imageURL: store.imageURL,
        creator: user?._id,
        membersOnly: store.membersOnly,
        regularPrice: store.regularPrice,
        memberPrice: store.memberPrice,
        fanlimit: store.fanlimit,
      });
      if (res.status == 201) {
        return res.data;
      }
    },
    onSuccess: () => {
      location.href = "/account/creator";
    },
  });

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
      className="flex overflow-y-auto flex-col pt-4 w-full max-w-mobile mb-[56px] max-h-[80%]  h-fit rounded-t-xl shadow-2xl bg-cultureGray absolute bottom-0 z-50 px-4"
    >
      <span className="flex w-full text-white">
        <span
          onClick={() => {
            close();
          }}
          className="flex items-center h-fit text-base cursor-pointer"
        >
          <ChevronLeft
            onClick={() => {
              close();
            }}
            className="h-4 w-4"
          />
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
              style={
                productType == btn.title
                  ? { background: "#FE621D", color: "#282B28" }
                  : { color: "white" }
              }
              key={btn.title}
              className="w-full text-sm capitalize gap-2 text-cultureOrange flex justify-center items-center"
            >
              <Icon fill={productType == btn.title ? "#282B28" : ""} />
              {btn.title}
            </span>
          );
        })}
      </div>
      <div className="flex h-fit w-fit relative mx-auto">
        <DigitalFrame image={store.imageURL} className="w-full h-fit" />
        <ProductTypeSelector
          setProductFormat={(p) => {
            store.setStoreValue("productFormat", p);
          }}
          className="absolute ml-4 mt-4"
        />
        <NamePrice
          name={store.title}
          setName={(v) => store.setStoreValue("title", v)}
          memberPrice={store.memberPrice}
          setMemberPrice={(v) => store.setStoreValue("memberPrice", v)}
          regularPrice={store.regularPrice}
          setRegularPrice={(v) => store.setStoreValue("regularPrice", v)}
          className="absolute bottom-0 left-0 max-w-mobile w-full px-4 mb-4"
          membersOnly={store.membersOnly}
        />
        <MemberSwitch
          className="absolute right-0 top-0 mt-4 mr-4"
          memberOnly={store.membersOnly}
          setmemberOnly={(b) => {
            store.setStoreValue("membersOnly", b);
          }}
        />
        <ImageUpload
          setImageUrl={(v) => {
            store.setStoreValue("imageURL", v);
          }}
          className="absolute left-0 right-0 top-0 bottom-0 mt-[55%]"
        />
      </div>
      <div className="flex flex-col w-full gap-2 mt-2">
        <Collaborator
          collaborator={store.collaborator}
          setCollaborator={(c) => {
            store.setStoreValue("collaborator", c);
          }}
        />
        <Description
          description={store.description}
          setDescription={(d) => {
            store.setStoreValue("description", d);
          }}
        />
        <EarlyFanLimit
          selectedDay={store.fanlimit}
          setselectedDay={(f: number) => {
            store.setStoreValue("fanlimit", f);
          }}
        />
      </div>
      {saveProduct.isPending ? (
        <div className="flex gap-2  min-h-[52px] my-4 items-center justify-center">
          <Spinner className="" />
          <h1 className="text-lg text-cultureOrange">Processing</h1>
        </div>
      ) : (
        <Button
          onClick={() => {
            saveProduct.mutate();
          }}
          className="bg-cultureOrange min-h-[52px] my-4"
        >
          Preview and Publish
        </Button>
      )}
    </motion.div>
  );
}

export default SellForm;
