import { useRouter } from "next/router";
import React, { use, useEffect } from "react";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import { useDayDetails } from "../../lib/hooks/admin/start_of_day_details/fetchStartDayDetails";
import Map from "components/Map";

import cookies from "js-cookie";

const dayDetails = () => {
  const token = cookies.get("access");

  const router = useRouter();
  const dayId = router.query.dayDetails;

  const { data, isLoading, isError, error } = useDayDetails(token, dayId);

  const day = data?.data;

  useEffect(() => {
    if (data) {
      console.log("day details data ==>>", day);
    }
  }, [data, isLoading, isError, error]);

  return (
    <div className="text-gray-700">
      {/* <h1 className="text-black">day list details : {dayId}</h1> */}
      {/* <div className="px-10 flex justify-center text-center">
        <h1 className="font-semibold text-2xl text-[#3E75A6] border-2 px-10 my-4 text-center  py-1">
          Client Start of Day
        </h1>
      </div> */}

      <div className="px-10 flex">
        <h1 className="font-semibold text-2xl text-[#3E75A6] my-4 text-center  py-1">
           এজেন্টের তথ্য
        </h1>
      </div>
      <div className=" space-y-4 my-4 px-20 text-gray-700">
        <h2 className="">
          {" "}
          ❏ এজেন্টের নাম : <span className="font-semibold">{day?.user}</span>
        </h2>
        {/* <h2 className="">
          ❏ প্রোজেক্ট এর নাম :{" "}
          <span className="font-semibold"> {day?.project_name}</span>
        </h2> */}
        <h2 className="">
          ❏ কাজ শুরুর সময়:{" "}
          <span className="font-semibold"> {day?.start_time}</span>
        </h2>
        <h2 className="">
          ❏ জমা দানের সময়:{" "}
          <span className="font-semibold"> {day?.submission_date}</span>
        </h2>
      </div>

      <div className="flex gap-12 py-10  ">
        <h2 className="font-semibold text-lg ml-20 text-gray-700">
          দোকানের ম্যাপ :
        </h2>
        {day?.group_working_user_location_latitude &&
          day?.group_distributor_distributor_location_Longitude && (
            <Map
              lat={day.group_working_user_location_latitude}
              lng={day.group_working_user_location_longitude}
            />
          )}
      </div>
      <div className="px-10 flex">
        <h1 className="font-semibold text-2xl text-[#3E75A6] my-4 text-center  py-1">
           ডিস্ট্রিবিউটর হাউসের তথ্য
        </h1>
      </div>

      <div className="space-y-6 px-20 py-4">
        <h2>
          {" "}
          ❏ আজকে কি ডিস্ট্রিবিউটর হাউজে যাবেন?
          <span className="font-semibold px-2">
            {day?.group_distributor_distributor_house === 1 ? "হ্যাঁ" : "না"}
          </span>
        </h2>
        <div className="flex gap-12 py-10  ">
          <h2 className="font-semibold text-lg  text-gray-700">
            ডিস্ট্রিবিউটর হাউজ <br /> ম্যাপ :
          </h2>
          {day?.group_distributor_distributor_location_Latitude &&
            day?.group_distributor_distributor_location_Longitude && (
              <Map
                lat={day.group_distributor_distributor_location_Latitude}
                lng={day.group_distributor_distributor_location_Longitude}
              />
            )}
        </div>
      </div>
      <div className="px-10 flex">
        <h1 className="font-semibold text-2xl text-[#3E75A6] my-4 text-center  py-1">
           POSM
        </h1>
      </div>
      <div className="px-20 space-y-4">
        <h2>
          {" "}
          ❏ POSM নিতে চাচ্ছেন :
          <span className="font-semibold px-2">
            {day?.group_posm_posm_confirmation === 1 ? "হ্যাঁ" : "না"}
          </span>
        </h2>
        <h2>
          {" "}
          ❏POSM আইটেম কোনগুলি আজকে নিবেন?
          {/* <span className="font-semibold space-y-2 pl-8">
            {[
              day?.group_posm_posm_items?.includes(1) && "শপস্ক্রিন",
              day?.group_posm_posm_items?.includes(2) && "ফেস্টুন",
              day?.group_posm_posm_items?.includes(3) && "কিউআর স্টিকার",
              day?.group_posm_posm_items?.includes(4) && "টেবিল স্টিকার",
              day?.group_posm_posm_items?.includes(5) && "পোস্টার",
              day?.group_posm_posm_items?.includes(6) && "ড্যাঙ্গলার",
              day?.group_posm_posm_items?.includes(7) && "বান্টিং",
            ]
              .filter(Boolean) // Removes falsy values from the list
              .map((item, index) => <div key={index}>{item}</div>) || (
              <div>কোনো আইটেম নেই</div>
            )}
          </span> */}
        </h2>

        {day?.group_posm_posm_shopscreen && (
          <h2 className="text-sm">
            {" "}
            ✔ শপস্ক্রিনের পরিমান :
            <span className="font-semibold text-sm px-2">
              {day?.group_posm_posm_shopscreen}
            </span>
          </h2>
        )}
        {day?.group_posm_posm_festoon && (
          <h2>
            {" "}
            ✔ ফেস্টুন পরিমান :
            <span className="font-semibold text-sm px-2">
              {day?.group_posm_posm_festoon}
            </span>
          </h2>
        )}

        {day?.group_posm_posm_qr_sticker && (
          <h2>
            {" "}
            ✔ কিউআর স্টিকার পরিমান :
            <span className="font-semibold text-sm px-2">
              {day?.group_posm_posm_qr_sticker}
            </span>
          </h2>
        )}

        {day?.group_posm_posm_table_sticker && (
          <h2 className="text-sm">
            {" "}
            ✔ টেবিল স্টিকারের পরিমান:
            <span className="font-semibold text-sm px-2">
              {day?.group_posm_posm_table_sticker}
            </span>
          </h2>
        )}

        {day?.group_posm_posm_table_poster && (
          <h2 className="text-sm">
            {" "}
            ✔ পোস্টার পরিমান :
            <span className="font-semibold px-2">
              {day?.group_posm_posm_table_poster}
            </span>
          </h2>
        )}

        {day?.group_posm_posm_bunting && (
          <h2 className="text-sm">
            {" "}
            ✔ বান্টিং পরিমান:
            <span className="font-semibold px-2">
              {day?.group_posm_posm_bunting}
            </span>
          </h2>
        )}

        {day?.group_posm_posm_obler && (
          <h2 className="text-sm">
            {" "}
            ✔ ওব্লারের পরিমান :
            <span className="font-semibold px-2">
              {day.group_posm_posm_obler}
            </span>
          </h2>
        )}
      </div>
      <div className="px-10 flex">
        <h1 className="font-semibold text-2xl text-[#3E75A6] my-4 text-center  py-1">
           Toolkit
        </h1>
      </div>
      <div className="px-20 space-y-4">
        <h2>
          {" "}
          ❏ Toolkit নিতে চাচ্ছেন :
          <span className="font-semibold px-2">
            {day?.group_toolkit_toolkit_confirmation === 1 ? "হ্যাঁ" : "না"}
          </span>
        </h2>
        <h2 className="py-4">
         
          ❏ Toolkit আইটেম কোনগুলি আজকে নিবেন?
          <span className=" space-y-2 pl-8 text-sm ">
            {[
              day?.group_toolkit_toolkit_items?.includes(1) && "✔ কম্বিনেশন প্লায়ার্স",
              day?.group_toolkit_toolkit_items?.includes(2) && "✔ হাতুড়ি",
              day?.group_toolkit_toolkit_items?.includes(3) && "✔ ডাস্টার",
              day?.group_toolkit_toolkit_items?.includes(4) && "✔ জিআই তার",
              day?.group_toolkit_toolkit_items?.includes(5) && "✔ এন্টি কাটার",
              day?.group_toolkit_toolkit_items?.includes(6) && "✔ সুতলি",
              day?.group_toolkit_toolkit_items?.includes(7) && "✔ স্কচটেপ",
              day?.group_toolkit_toolkit_items?.includes(8) && "✔ অ্যাডহেসিভ",
              day?.group_toolkit_toolkit_items?.includes(9) && "✔ পেরেক",
              day?.group_toolkit_toolkit_items?.includes(10) && "✔ অন্যান্য",
            ]
              .filter(Boolean)
              .map((item, index) => <div key={index}>{item}</div>) || (
              <div>কোনো আইটেম নেই</div>
            )}
          </span>
        </h2>





      
{ day?.group_toolkit_toolkit_items?.includes(10) &&  
<h2>
    ❏ অন্যান্য জিনিসের বর্ণনা
    <h1 className="font-semibold px-2">
      {day?.group_toolkit_others || "কোনো বর্ণনা নেই"}
    </h1>
  </h2>}


      </div>
    </div>
  );
};

dayDetails.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};
export default dayDetails;
