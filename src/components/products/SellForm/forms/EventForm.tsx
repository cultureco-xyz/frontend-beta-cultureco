import React, { useEffect } from "react";
import { TicketFrame } from "../frames/TicketFrame";
import { Button } from "@/components/ui/button";
import { ProductTypeSelector } from "../ProductTypeSelector";
import NamePrice from "../NamePrice";
import { MemberSwitch } from "../MemberSwitch";
import { Description } from "../Description";

import { Collaborator } from "../Collaborator";
import ImageUpload from "../ImageUpload";
import Spinner from "@/components/common/spinner";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { create } from "zustand";
import {
  TDigitalProductFormats,
  TEventProductFormats,
  TProductTabs,
} from "../config";
import { AudioUpload } from "../AudioUpload";

import { StockLimit } from "../StockLimit";
import DatePicker from "../DatePicker";
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
  eventDate: Date;
}

interface storeType extends Store {
  setStoreValue: (
    key: keyof Store,
    value: string | number | boolean | Date
  ) => void;
}

const initialState: Store = {
  title: "",
  description: "",
  productType: TProductTabs.EVENT,
  productFormat: TEventProductFormats.IRL_EVENT,
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
  eventDate: new Date(),
};

const useStore = create<storeType>()((set) => ({
  ...initialState,
  setStoreValue: (
    key: keyof Store,
    value: string | number | boolean | Date
  ) => {
    return set({ [key]: value });
  },
}));
function EventForm() {
  const store = useStore();
  const user = useAuthContext();
  console.log(store);

  useEffect(() => {
    //reset state
    const format = store.productFormat;
    Object.keys(initialState).map((ele) => {
      store.setStoreValue(ele as keyof Store, initialState[ele as keyof Store]);
    });
    store.setStoreValue("productFormat", format);
  }, [store.productFormat]);

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
      location.href = "/account";
    },
  });
  return (
    <>
      <div className="flex h-fit relative mx-auto w-full ">
        <TicketFrame imageUrl={store.imageURL} className="w-full h-fit " />
        <ProductTypeSelector
          configType="event"
          setProductFormat={(p) => {
            store.setStoreValue("productFormat", p);
          }}
          className="absolute ml-4 mt-4"
        />
        <DatePicker
          className="absolute bottom-11 left-0 max-w-mobile w-full px-4 mb-4"
          savedateTime={(dt) => {
            store.setStoreValue("eventDate", dt);
          }}
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
          className="absolute left-0 right-0 top-0 bottom-0 mt-[38%]"
        />
      </div>
      <div className="flex flex-col w-full gap-2 mt-2">
        <Collaborator
          collaborator={store.collaborator}
          setCollaborator={(c) => {
            store.setStoreValue("collaborator", c);
          }}
        />
        {store.productFormat == TDigitalProductFormats.MUSIC && (
          <AudioUpload
            songName={store.songName}
            setSongName={(sng) => {
              store.setStoreValue("songName", sng);
            }}
            artist={store.artist}
            setSongArtist={(artst) => {
              store.setStoreValue("artist", artst);
            }}
            setaudioUrl={(adurl) => {
              store.setStoreValue("audioUrl", adurl);
            }}
            audioUrl={store.audioUrl}
          />
        )}
        <Description
          description={store.description}
          setDescription={(d) => {
            store.setStoreValue("description", d);
          }}
        />
        <StockLimit
          title="Tickets"
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

export default EventForm;
