import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import cookies from "js-cookie";
import Image from "next/image";
import Map from "components/Map";
import { Spinner } from "@nextui-org/react";
import { useShopDetails } from "lib/hooks/admin/shopDetails/fetchShopDetails";
import DynamicImage from "components/DynamicImage";

const ShopDetail = () => {
  const router = useRouter();
  const shopId = router.query.shopDetail;
  const token = cookies.get("access");
  const [image, setImage] = useState(null);
  const [fimg1, setFimg1] = useState(null);
  const [fimg2, setFimg2] = useState(null);
  const [fimg3, setFimg3] = useState(null);
  const [fimg4, setFimg4] = useState(null);
  const [shopPoinerImg, setShopPoinerImg] = useState(null);
  const [qrStickerImg, setQrStickerImg] = useState(null);
  const [tableStcker, setTableStcker] = useState(null);
  const [signbooardImg, setSignbooardImg] = useState(null);
  const [endImg, setEndImg] = useState(null);
  const [id, setId] = useState(null);

  // const data = null;
  // const isLoading = false;
  // const isError = false;
  // const error = false;
  const { data, isLoading, isError, error } = useShopDetails(token, shopId);
  useEffect(() => {
    console.log("Shop details data:", data);
  }, [data]);

  console.log("fimg1", fimg1);
  console.log("id name ===>>", id, image);
  // const {
  //   data: images,
  //   isLoading: imageisLoading,
  //   isError: imageisError,
  //   error: imgError,
  // } = useShopImage(token, id, image);

  const shop = data?.data;
  console.log("shop>>>>>>>>>>>>>", shop);

  // console.log("ImageData", images);

  // console.log("shop?.group_shop_image ++++", shop?.group_shop_image);
  // console.log("shop?.remote_id -+--", shop?.remote_id);

  useEffect(() => {
    if (shop?.group_shop_image) {
      setImage(shop?.group_shop_image);
    }
    if (shop?.remote_id) {
      setId(shop?.remote_id);
    }
    if (shop?.group_festoon_festoon01) {
      setFimg1(shop?.group_festoon_festoon01);
    }
    if (shop?.group_festoon_festoon02) {
      setFimg2(shop?.group_festoon_festoon02);
    }
    if (shop?.group_festoon_festoon03) {
      setFimg3(shop?.group_festoon_festoon03);
    }
    if (shop?.group_festoon_festoon04) {
      setFimg4(shop?.group_festoon_festoon04);
    }
    if (shop?.group_shap_pointer_picture) {
      setShopPoinerImg(shop?.group_shap_pointer_picture);
    }
    if (shop?.group_qr_qr_sticker_image) {
      setQrStickerImg(shop?.group_qr_qr_sticker_image);
    }
    if (shop?.group_qr_qr_sticker_image) {
      setTableStcker(shop?.group_qr_qr_sticker_image);
    }
    if (shop?.group_signboard_upay_picture) {
      setSignbooardImg(shop?.group_signboard_upay_picture);
    }
    if (shop?.end_picture) {
      setEndImg(shop?.end_picture);
    }
  }, [shop?.group_shop_image, shop?.remote_id]);

  // Loading, error or no data handling
  if (isLoading) {
    return <div className="text-gray-700">Loading...</div>;
  }

  if (isError) {
    return <div className="text-gray-700">Error: {error?.message}</div>;
  }

  if (!data) {
    return <div className="text-gray-700">No data found</div>;
  }

  return (
    <>
      <div className="text-gray-700 p-4 my-4">
        {/* <h1 className="text-gray-300">Shop Details for new: {shopId}</h1> */}

        <div className="px-10 flex">
          <h1 className="font-semibold text-2xl text-[#3E75A6] my-4 text-center  py-1">
            এজেন্টের তথ্য
          </h1>
        </div>
        <div className=" space-y-4 my-10 px-20">
          <h2>
            ❏ এজেন্টের নাম্বার গ্রহণের মাধ্যম :{" "}
            <span className="font-semibold">
              {shop?.phone_number_scan == null &&
              shop?.phone_number_edittext.length > 0
                ? "By hand write"
                : "By Scan"}
            </span>
          </h2>

          <h2 className="">
            {" "}
            ❏ এজেন্টের নাম : <span className="font-semibold">{shop?.user}</span>
          </h2>
          <h2 className="">
            ❏ এজেন্টের নাম্বার :{" "}
            <span className="font-semibold"> {shop?.verify_phone_number}</span>
          </h2>
        </div>

        <div>
          <div className="px-10 flex">
            <h1 className="font-semibold my-4 text-2xl  text-[#3E75A6] py-1">
              দোকানের তথ্য{" "}
            </h1>
          </div>

          <div className="flex gap-12 py-10 justify-center ">
            <h2 className="font-semibold text-lg -ml-20">দোকানের ম্যাপ :</h2>
            {shop?.shop_location_latitude && shop?.shop_location_longitude && (
              <Map
                lat={shop.shop_location_latitude}
                lng={shop.shop_location_longitude}
              />
            )}

            <h2 className="font-semibold text-lg">দোকানের ছবি :</h2>
            <DynamicImage image_id={id} image={image} />
          </div>

          <div className="gap-6 pt-12 flex px-20 ">
            <div>
              <div className="space-y-6 py-12">
                <h2>
                  {" "}
                  ❏ client অথবা অন্যান্য সাইনবোর্ড আছে কি?
                  <span className="font-semibold px-2">
                    {shop?.signboard_upay_and_others === 1 ? "হ্যাঁ" : "না"}
                  </span>
                </h2>

                <h2>
                  {" "}
                  ❏ কার সাইনবোর্ড আছে ?
                  <span className="font-semibold px-4">
                    {shop?.signboard_competitors_selection === 1
                      ? "client"
                      : shop?.signboard_competitors_selection === 2
                      ? "বিকাশ"
                      : shop?.signboard_competitors_selection === 3
                      ? "নগদ"
                      : shop?.signboard_competitors_selection === 4
                      ? "রকেট"
                      : "অন্যান্য"}
                  </span>
                </h2>
              </div>
              {shop?.signboard_competitors_selection === 1 && (
                <div className="flex">
                  <h2>
                    {" "}
                    ❏ client সাইনবোর্ডের বর্তমান অবস্থা:{" "}
                    <span className="font-semibold">
                      {shop?.group_signboard_signboard_status || "N/A"}
                    </span>
                  </h2>

                  <h2 className="font-semibold">দোকানের ছবি : </h2>
                  <DynamicImage image_id={id} image={signbooardImg} />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="px-10 flex">
              <h1 className="font-semibold  text-center my-10 text-2xl  text-[#3E75A6] py-1">
                শপস্ক্রিন
              </h1>{" "}
            </div>

            <div className=" px-20 gap-20 space-y-4">
              <h2>
                {" "}
                ❏ client শপস্ক্রিন আছে ?{" "}
                <span className="font-semibold">
                  {" "}
                  {shop?.group_shopscreen_shopscreen_status === 1
                    ? "হ্যাঁ"
                    : "না"}
                </span>
              </h2>
              <h2>
                {" "}
                ❏ শপস্ক্রিন ইন্সটল :{" "}
                <span className="font-semibold">
                  {shop?.group_shopscreen_new_shopscreen === 1 ? "হ্যাঁ" : "না"}
                </span>
              </h2>
            </div>
          </div>
          <div>
            <div className="px-10 flex">
              <h1 className="font-semibold text-2xl  text-[#3E75A6] text-center my-10 py-1">
                শপ পয়েন্টার{" "}
              </h1>{" "}
            </div>

            <div className=" space-y-4 px-20 gap-10 ">
              <h2>
                {" "}
                ❏ client অথবা অন্যান্য শপ পয়েন্টার আছে কি?{" "}
                <span className="font-semibold">
                  {shop?.group_shap_pointer_upay_shap_pointer === 1
                    ? "হ্যাঁ"
                    : "না"}
                </span>
              </h2>

              <h2>
                {" "}
                ❏ client শপ পয়েন্টারের বর্তমান অবস্থা :{" "}
                <span className="font-semibold">
                  {shop?.group_shap_pointer_shop_pointer_status || "N/A"}
                </span>
              </h2>

              {shop?.group_shap_pointer_upay_shap_pointer === 1 && (
                <div className="flex gap-4">
                  <h2>
                    {" "}
                    ❏ কার শপ পয়েন্টার আছে? <br />
                    <span className="font-semibold">
                      {shop?.group_shap_pointer_shop_pointer_selection === 1
                        ? "client"
                        : shop?.group_shap_pointer_shop_pointer_selection === 2
                        ? "বিকাশ"
                        : shop?.group_shap_pointer_shop_pointer_selection === 3
                        ? "নগদ"
                        : shop?.group_shap_pointer_shop_pointer_selection === 4
                        ? "রকেট" 
                        : "অন্যান্য"}
                    </span>
                  </h2>
                  <h2 className="font-semibold">
                    client শপ পয়েন্টারের ছবি :{" "}
                  </h2>
                  <DynamicImage image_id={id} image={shopPoinerImg} />
                </div>
              )}
            </div>
          </div>

          <div className="px-10 flex">
            <h1 className="font-semibold  text-center my-10 text-2xl  text-[#3E75A6] py-1">
              ফেস্টুন
            </h1>{" "}
          </div>
          <div className="gap-10 pt-12  px-20 ">
            <h2>
              {" "}
              ❏ আজকে নতুন ফেস্টুন ইনস্টল করেছেন কি?{" "}
              <span className="font-semibold">
                {" "}
                {shop?.group_festoon_festoon_status === 1 ? "হ্যাঁ" : "না"}
              </span>
            </h2>
            {shop?.group_festoon_festoon_status === 1 && (
              <h2>
                {" "}
                ❏ কতগুলো ফেস্টুন ইনস্টল করেছেন?{" "}
                <span className="font-semibold">
                  {shop?.group_festoon_festoon_quantity}
                </span>
              </h2>
            )}
          </div>

          <div className="gap-10 my-10 px-20 justify-center">
            <div className="flex gap-10">
              <h2 className="font-semibold">ফেস্টুন #১ এর ছবি </h2>
              <DynamicImage image_id={id} image={fimg1} />

              <h2 className="font-semibold">ফেস্টুন #২ এর ছবি </h2>

              <DynamicImage image_id={id} image={fimg2} />
            </div>

            <div className="flex my-8 ">
              <h2 className="font-semibold">ফেস্টুন #৩ এর ছবি </h2>

              <DynamicImage image_id={id} image={fimg3} />

              <h2 className="font-semibold">ফেস্টুন #৪ এর ছবি </h2>
              <DynamicImage image_id={id} image={fimg4} />
            </div>
          </div>

          <div className="px-10 flex">
            <h1 className="font-semibold  text-center text-2xl  text-[#3E75A6] py-1">
              কিউআর স্ট্যান্ড অথবা স্টিকার
            </h1>
          </div>

          <div className="gap-6 pt-12 flex px-20">
            <h2>
              ❏ কিউআর স্ট্যান্ড অথবা স্টিকার এর মধ্যে কি কি আছে? <br />
              <span className="font-semibold">
                {shop?.group_qr_qr_sticker === 1
                  ? "কিউআর স্ট্যান্ড"
                  : shop?.group_qr_qr_sticker === 2
                  ? "কিউআর স্টিকার"
                  : "উভয়ই"}
              </span>
            </h2>

            <h2 className="font-semibold">
              কিউআর স্ট্যান্ড অথবা স্টিকার এর ছবি :{" "}
            </h2>
            <DynamicImage image_id={id} image={qrStickerImg} />
          </div>

          <div className="px-10 flex">
            <h1 className="font-semibold  text-center text-2xl  text-[#3E75A6] py-1">
              টেবিল স্টিকার
            </h1>{" "}
          </div>

          <div className="gap-20 pt-12 flex px-20 ">
            <div className="space-y-4">
              <h2>
                ❏ client টেবিল স্টিকার আছে কি?
                <span className="font-semibold">
                  {" "}
                  {shop?.group_table_sticker_table_sticker_available === 1
                    ? "হ্যাঁ"
                    : "না"}
                </span>
              </h2>
              {shop?.group_table_sticker_table_sticker_available === 1 && (
                <h2>
                  ❏ নতুন টেবিল স্টিকার ইন্সটল করবেন কি?{" "}
                  <span className="font-semibold">
                    {shop?.group_table_sticker_new_table_sticker === 1
                      ? "হ্যাঁ"
                      : "না"}
                  </span>
                </h2>
              )}
              {shop?.group_table_sticker_new_table_sticker === 1 && (
                <h2>
                  ❏ নতুন টেবিল স্টিকার সংখ্যা : <br />{" "}
                  <span className="font-semibold">
                    {shop?.group_table_sticker_table_sticker_quantity}
                  </span>
                </h2>
              )}
            </div>
            <h2 className="font-semibold pl-25">client টেবিল স্টিকারের ছবি:</h2>
            <DynamicImage image_id={id} image={tableStcker} />
          </div>

          <div>
            <div className="px-10 flex">
              <h1 className="font-semibold  text-center text-2xl  text-[#3E75A6] py-1">
                ব্র্যান্ডিং আইটেম
              </h1>{" "}
            </div>
            <div className="  gap-24 px-20 py-10">
              <div className="space-y-4">
                <h2>
                  ❏ নতুন ব্র্যান্ডিং আইটেম ইন্সটল করবেন?
                  <span className="font-semibold">
                    {" "}
                    {shop?.group_branding_new_item_installation === 1
                      ? "হ্যাঁ"
                      : "না"}
                  </span>
                </h2>
              </div>

              {shop?.group_branding_poster_quantity && (
                <h2>
                  ❏ পোস্টারের পরিমান :
                  <span className="font-semibold">
                    {shop?.group_branding_poster_quantity}
                  </span>
                </h2>
              )}

              <h2>
                ❏ ড্যাঙ্গলারের পরিমান :
                {shop?.group_branding_dangler_quantity && (
                  <span className="font-semibold">
                    {shop?.group_branding_dangler_quantity}
                  </span>
                )}
              </h2>

              {shop?.group_branding_bunting_quantity > 0 && (
                <h2>
                  ❏ বান্টিং এর পরিমান :
                  <span className="font-semibold">
                    {shop?.group_branding_bunting_quantity}
                  </span>
                </h2>
              )}

              {shop?.group_branding_obler_quantity && (
                <h2>
                  ❏ ওব্লারের পরিমান :
                  <span className="font-semibold">
                    {shop?.group_branding_obler_quantity}
                  </span>
                </h2>
              )}
            </div>

            <div className="px-10 flex">
              <h1 className="font-semibold  text-center text-2xl  text-[#3E75A6] py-1">
                কম্পিটিটরের তথ্য
              </h1>{" "}
            </div>
            <div className=" flex gap-24 px-20 py-10">
              <div className="space-y-4">
                <h2>
                  ❏ কম্পিটিটরের ক্যাম্পেইন কি হচ্ছে?
                  <span className="font-semibold">
                    <br />{" "}
                    {shop?.group_competitor_competitor_status === 1
                      ? "হ্যাঁ"
                      : "না"}
                  </span>
                </h2>
                <h2>
                  ❏ নতুন ক্যাম্পেইন সমূহ :<br />
                  <ul className="font-semibold">
                    {[
                      shop?.group_competitor_new_campain_list?.includes(1) &&
                        "ট্যারিফ পরিবর্তন",
                      shop?.group_competitor_new_campain_list?.includes(2) &&
                        "ফেস্টুনের নতুন কালার অথবা কমিউনিকেশন",
                      shop?.group_competitor_new_campain_list?.includes(3) &&
                        "কমিশন",
                      shop?.group_competitor_new_campain_list?.includes(4) &&
                        "নতুন ইভেন্ট",
                      shop?.group_competitor_new_campain_list?.includes(5) &&
                        "এজেন্টের জন্য গিফট",
                      shop?.group_competitor_new_campain_list?.includes(6) &&
                        "অন্যান্য",
                    ]
                      .filter(Boolean)
                      .map((campaign, index) => (
                        <li key={index}>{campaign}</li>
                      )) || <li>কোনো ক্যাম্পেইন নেই</li>}
                  </ul>
                </h2>

                <h2>
                  ❏ আজকে কতগুলো নতুন একাউন্ট খোলা হয়েছে?:
                  <br />{" "}
                  <span className="font-semibold">
                    {shop?.new_account_today || "N/A"}
                  </span>
                </h2>
              </div>
             <div className=" flex gap-4">
             <h2 className="font-semibold px-4 ">
                সকল কাজ সম্পন্নের পরে বর্তমান <br /> অবস্থা :{" "}
              </h2>
              <DynamicImage image_id={id} image={endImg} />
            </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

ShopDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default ShopDetail;
