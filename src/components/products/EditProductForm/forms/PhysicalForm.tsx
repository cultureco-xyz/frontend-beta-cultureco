import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ProductTypeSelector } from "../ProductTypeSelector";
import NamePrice from "../NamePrice";
import { MemberSwitch } from "../MemberSwitch";
import { Description } from "../Description";
import { EarlyFanLimit } from "../EarlyFanLimit";
import { Collaborator } from "../Collaborator";
import ImageUpload from "../ImageUpload";
import Spinner from "@/components/common/spinner";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { create } from "zustand";
import { TPhysicalProductFormats, TProductTabs } from "../config";
import { PrintSize } from "../PrintSize";
import { StockLimit } from "../StockLimit";
import { VinylPhysicalFrame } from "../frames/VinylPhysicalFrame";
import PhyiscalFrame from "../frames/PhyiscalFrame";
import { IProductData } from "@/types";

interface Store {
  title: string;
  description: string;
  productType: string;
  collaborator: string;
  album: string;
  productFormat: string;
  imageURL: string;
  creator: string;
  membersOnly: boolean;
  regularPrice: number;
  memberPrice: number;
  fanlimit: number;
  audioUrl: string;
  artist: string;
  songName: string;
  printSize: string;
  quantity: number;
}

interface storeType extends Store {
  setStoreValue: (key: keyof Store, value: string | number | boolean) => void;
}

const initialState: Store = {
  title: "",
  description: "",
  productType: TProductTabs.PHYSICAL,
  productFormat: TPhysicalProductFormats.PRINT,
  imageURL: "",
  creator: "",
  membersOnly: false,
  regularPrice: 0,
  memberPrice: 0,
  fanlimit: 1,
  collaborator: "",
  album: "",
  audioUrl: "",
  artist: "",
  songName: "",
  printSize: "",
  quantity: 1,
};

const useStore = create<storeType>()((set, get) => ({
  ...initialState,
  setStoreValue: (
    key: keyof Store,
    value: string | number | boolean | Date
  ) => {
    const currentValue = get()[key]; // Get the current value from the store
    // Only set the state if the value is different
    if (currentValue !== value) {
      return set({ [key]: value });
    }
  },
}));

interface PhysicalFormProps {
  initialData: Store;
}

function PhysicalForm({ initialData }: PhysicalFormProps) {
  const store = useStore();
  const user = useAuthContext();
  console.log(store);

  const hasInitialized = useRef(false); // Ref to track initialization

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      // Initialize store values with initialData
      Object.keys(initialData).forEach((key) => {
        const value = initialData[key as keyof Store];
        store.setStoreValue(key as keyof Store, value); // Set value directly from initialData
      });

      // Ensure that productFormat is updated
      if (initialData.productFormat) {
        store.setStoreValue("productFormat", initialData.productFormat);
      }
    }
  }, [initialData, store]);

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
        printSize: store.printSize,
        quantity: store.quantity,
      } as Partial<IProductData>);
      if (res.status == 201) {
        return res.data;
      }
    },
    onSuccess: () => {
      location.href = "/account";
    },
  });
  return (
    <>
      <div className="flex h-fit  w-full relative mx-auto">
        {store.productFormat == TPhysicalProductFormats.VINYL && (
          <VinylPhysicalFrame
            imageUrl={store.imageURL}
            className="w-full h-fit"
          />
        )}
        {store.productFormat == TPhysicalProductFormats.APPAREL && (
          <PhyiscalFrame imageUrl={store.imageURL} className="" />
        )}
        {store.productFormat == TPhysicalProductFormats.PRINT && (
          <PhyiscalFrame imageUrl={store.imageURL} className="" />
        )}
        {store.productFormat == "" && (
          <PhyiscalFrame imageUrl={store.imageURL} className="" />
        )}
        <ProductTypeSelector
          configType="physical"
          setProductFormat={(p) => {
            store.setStoreValue("productFormat", p); // Ensure this updates the store correctly
          }}
          selectedProductFormat={store.productFormat} // Ensure it reads from store.productFormat
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
        {store.productFormat == TPhysicalProductFormats.PRINT && (
          <PrintSize
            selectedSize={store.printSize as PrintSize}
            setSelectedSize={(size) => store.setStoreValue("printSize", size)}
          />
        )}
        <EarlyFanLimit
          selectedDay={store.fanlimit}
          setselectedDay={(f: number) => {
            store.setStoreValue("fanlimit", f);
          }}
        />
        <StockLimit
          limit={store.quantity}
          setLimit={(sl) => {
            store.setStoreValue("quantity", sl);
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
    </>
  );
}

export default PhysicalForm;
