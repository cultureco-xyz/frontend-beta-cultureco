import React, { useEffect } from "react";
import DigitalFrame from "../frames/DigitalFrame";
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
import { TDigitalProductFormats, TProductTabs } from "../config";
import { AlbumConfig } from "../AlbumConfig";
import { AudioUpload } from "../AudioUpload";
import { DigitalAudioFrame } from "../frames/DigitalAudioFrame";
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
  album: "",
  audioUrl: "",
  artist: "",
  songName: "",
};

const useStore = create<storeType>()((set) => ({
  ...initialState,
  setStoreValue: (key: keyof Store, value: string | number | boolean) => {
    return set({ [key]: value });
  },
}));
function DigitalForm() {
  const store = useStore();
  const user = useAuthContext();
  console.log(user, store);

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
        audioUrl: store.audioUrl,
        songName: store.songName,
        album: store.album || undefined,
        collaborator: store.collaborator || undefined,
        artist: store.artist,
      } as Partial<IProductData>);
      if (res.status == 201) {
        return res.data;
      }
    },
    onSuccess: () => {
      location.href = "/account/creator";
    },
  });
  return (
    <>
      <div className="flex h-fit w-full relative mx-auto">
        {store.productFormat == "" && (
          <DigitalFrame image={store.imageURL} className="w-full h-fit" />
        )}
        {store.productFormat == TDigitalProductFormats.DIGITAL_ART && (
          <DigitalFrame image={store.imageURL} className="w-full h-fit" />
        )}
        {store.productFormat == TDigitalProductFormats.MUSIC && (
          <DigitalAudioFrame
            imageUrl={store.imageURL}
            className="w-full h-fit"
          />
        )}
        <ProductTypeSelector
          configType="digital"
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
        <AlbumConfig
          userID={user?._id as string}
          album={store.album}
          setalbum={(albm) => {
            store.setStoreValue("album", albm);
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
    </>
  );
}

export default DigitalForm;
