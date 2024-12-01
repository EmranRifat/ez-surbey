import { useShopImage } from "lib/hooks/admin/shopDetails/fetchImage";
import React from "react";
import cookies from "js-cookie";
import { Spinner } from "@nextui-org/react";

const DynamicImage = ({ image_id, image }) => {
  const token = cookies.get("access");

  const {
    data: images,
    isLoading: imageisLoading,
    isError: imageisError,
    error: imgError,
  } = useShopImage(token, image_id, image);

  return (
    <div>
        {imageisLoading ? <Spinner className="mt-6"/>: <img
        className="h-[300px] w-[450px]"
        src={`data:image/jpeg;base64,${images?.data?.image || ""}`}
        alt="Dynamically Loaded Image"
      />}
     
    </div>
  );
};

export default DynamicImage;
