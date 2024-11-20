import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  TDigitalProductFormats,
  TEventProductFormats,
  TPhysicalProductFormats,
  TProductTabs,
} from "./config";
import { motion } from "framer-motion";
import { IProductData } from "@/types";
import ImageUpload from "./ImageUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

interface EditProductFormProps {
  close: () => void;
  productData: IProductData;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  close,
  productData,
}) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<IProductData>(productData);
  const [productType, setProductType] = useState<string>(
    productData.productType
  );
  const [productFormat, setProductFormat] = useState<string>(
    productData.productFormat
  );
  const [imageURL, setImageURL] = useState<string>(productData.imageURL || "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    if (Number.isInteger(Number(value)) && Number(value) >= 0) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setProductType(value);
    setFormData((prevData) => ({
      ...prevData,
      productType: value,
      productFormat: "", // Reset the format if the product type changes
    }));
  };

  const handleProductFormatChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProductFormat(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      productFormat: e.target.value,
    }));
  };

  const getProductFormatOptions = () => {
    if (productType === TProductTabs.DIGITAL) {
      return Object.values(TDigitalProductFormats);
    }
    if (productType === TProductTabs.PHYSICAL) {
      return Object.values(TPhysicalProductFormats);
    }
    if (productType === TProductTabs.EVENT) {
      return Object.values(TEventProductFormats);
    }
    return [];
  };

  const updateProduct = useMutation({
    mutationKey: ["update-product"],
    mutationFn: async () => {
      const res = await axios.put(
        `/backend/product/update-product/${productData._id}`,
        {
          title: formData.title,
          description: formData.description,
          imageURL: formData.imageURL,
          membersOnly: formData.membersOnly,
          regularPrice: formData.regularPrice,
          memberPrice: formData.memberPrice,
          fanlimit: formData.fanlimit,
        } as Partial<IProductData>
      );
      if (res.status == 201) {
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-products", params.id],
      });
    },
  });

  return (
    <div
      className="fixed top-0 left-0 inset-0 z-[999]"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0, transition: { duration: 0.3 } }}
        className="flex overflow-y-auto flex-col pt-4 w-full max-w-mobile mb-[56px] max-h-[82%] h-fit rounded-t-xl shadow-2xl bg-cultureGray absolute bottom-0 z-[999] px-4"
      >
        <span
          className="flex w-full text-cultureWhite"
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
            <ChevronLeft className="h-4 w-4" /> Back
          </span>
        </span>

        {/* Edit Form */}
        <div className="mt-4 mb-4 flex w-full min-h-[34px] rounded-[8px] h-min">
          <form className="w-full space-y-4">
            {/* Image Upload */}
            <div>
              <label className="text-cultureWhite block">Product Image</label>
              <ImageUpload
                setImageUrl={(url) => {
                  setImageURL(url); // Update the image URL when uploaded
                  setFormData((prevData) => ({
                    ...prevData,
                    imageURL: url, // Save the image URL in form data
                  }));
                }}
                className="mb-4"
              />
              {imageURL && (
                <div className="mt-2">
                  <img
                    src={imageURL}
                    alt="Product Preview"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
            {/* Title */}
            <div>
              <label className="text-cultureWhite block">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              />
            </div>
            {/* Description */}
            <div>
              <label className="text-cultureWhite block">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              />
            </div>
            {/* Product Type */}
            {/* <div>
              <label className="text-cultureWhite block">Product Type</label>
              <select
                name="productType"
                value={productType}
                onChange={handleProductTypeChange}
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              >
                {Object.values(TProductTabs).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div> */}
            {/* Product Format */}
            {/* <div>
              <label className="text-cultureWhite block">Product Format</label>
              <select
                name="productFormat"
                value={productFormat}
                onChange={handleProductFormatChange}
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              >
                {getProductFormatOptions().map((format) => (
                  <option key={format} value={format}>
                    {format.charAt(0).toUpperCase() + format.slice(1)}
                  </option>
                ))}
              </select>
            </div> */}
            {/* Quantity */}
            <div>
              <label className="text-cultureWhite block">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={(e) => handleNumberChange(e, "quantity")}
                min="1"
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              />
            </div>
            {/* Regular Price */}
            <div>
              <label className="text-cultureWhite block">Regular Price</label>
              <input
                type="number"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={(e) => handleNumberChange(e, "regularPrice")}
                min="0"
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              />
            </div>
            {/* Member Price */}
            <div>
              <label className="text-cultureWhite block">Member Price</label>
              <input
                type="number"
                name="memberPrice"
                value={formData.memberPrice}
                onChange={(e) => handleNumberChange(e, "memberPrice")}
                min="0"
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              />
            </div>
            {/* Members Only */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="membersOnly"
                checked={formData.membersOnly}
                onChange={handleBooleanChange}
                className="mr-2"
              />
              <label className="text-cultureOrange">Members Only</label>
            </div>
            {/* Fan Limit */}
            <div>
              <label className="text-cultureWhite block">Early Fan Limit</label>
              <input
                type="number"
                name="fanlimit"
                value={formData.fanlimit}
                onChange={(e) => handleNumberChange(e, "fanlimit")}
                min="1"
                className="w-full p-2 rounded-md text-cultureOrange bg-cultureGrayVariant"
              />
            </div>
            {/* Submit */}
            <div className="flex flex-row gap-4 items-center justify-between w-full">
              <button
                type="button"
                onClick={close}
                className="w-1/2 p-2 text-cultureOrange border border-cultureOrange rounded-md hover:bg-cultureOrange hover:text-cultureWhite font-groteskSemiBold"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => {
                  updateProduct.mutate();
                }}
                className="w-1/2 p-2 text-cultureGrayVariant bg-cultureOrange font-groteskSemiBold rounded-md hover:bg-cultureOrange"
              >
                Save Changes
              </button>
            </div>
            <div className="w-full h-2"></div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProductForm;
