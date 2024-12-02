import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from 'next/router';  
function ShopDataTable({ ShopData, isLoading, error, page, pageSize }) {
  console.log("table ShopData===>", ShopData);
  


  const handleRowClick = (shopId) => {
    window.open(`shopData/${shopId}`);
    
  };
  const handleLocationClick = (e, latitude, longitude) => {
    e.stopPropagation(); // Prevent row click event from firing
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-lg py-10">
        <Spinner color="default" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  const hasShopData = ShopData && ShopData.length > 0;

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-400">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-darkblack-600">
          <thead className="text-gray-700 dark:text-white bg-[#dde4eb] dark:bg-gray-700">
            <tr>
              {/* Define all your <th> elements here */}
              <th scope="col" className="py-1 px-3">
                SL
              </th>
              <th scope="col" className="py-1 px-3">
                Submit Time
              </th>
              <th scope="col" className="py-1 px-3">
                Start Time
              </th>
              <th scope="col" className="py-1 px-3">
                End Time
              </th>
              <th scope="col" className="py-1 px-3">
                User Name
              </th>
              <th scope="col" className="py-1 px-3">
                Device ID
              </th>
              <th scope="col" className="py-1 px-3">
                Agent Cell No.
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Location
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Image
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Status
              </th>
              <th scope="col" className="py-1 px-3">
                Signboard Status
              </th>
              <th scope="col" className="py-1 px-3">
                Signboard Brand
              </th>
              <th scope="col" className="py-1 px-3">
                Signboard Image
              </th>
              <th scope="col" className="py-1 px-3">
                Signboard Condition
              </th>
              {/* Additional columns */}
              <th scope="col" className="py-1 px-3">
                Shop Screen Status
              </th>
              <th scope="col" className="py-1 px-3">
                New Shop Screen
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Pointer
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Pointer Brand
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Pointer Others
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Pointer Image
              </th>
              <th scope="col" className="py-1 px-3">
                Shop Pointer Condition
              </th>
              <th scope="col" className="py-1 px-3">
                New Festoon
              </th>
              <th scope="col" className="py-1 px-3">
                New Festoon No.
              </th>
              <th scope="col" className="py-1 px-3">
                New Festoon Image
              </th>
              <th scope="col" className="py-1 px-3">
                QR Stand/Sticker
              </th>
              <th scope="col" className="py-1 px-3">
                QR Stand/Sticker Image
              </th>
              <th scope="col" className="py-1 px-3">
                Table Sticker
              </th>
              <th scope="col" className="py-1 px-3">
                New Table Sticker
              </th>
              <th scope="col" className="py-1 px-3">
                New Branding Item
              </th>
              <th scope="col" className="py-1 px-3">
                New Poster
              </th>
              <th scope="col" className="py-1 px-3">
                New Dangler
              </th>
              <th scope="col" className="py-1 px-3">
                Bunting
              </th>
              <th scope="col" className="py-1 px-3">
                Wobbler
              </th>
              <th scope="col" className="py-1 px-3">
                Competitor Campaign
              </th>
              <th scope="col" className="py-1 px-3">
                Campaign Name
              </th>
              <th scope="col" className="py-1 px-3">
                Campaign Others
              </th>
              <th scope="col" className="py-1 px-3">
                Campaign Comment
              </th>
              <th scope="col" className="py-1 px-3">
                Final Image
              </th>
              <th scope="col" className="py-1 px-3">
                New Account Today
              </th>
              <th scope="col" className="py-1 px-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-darkblack-600 text-gray-700 dark:text-white">
            {hasShopData ? (
              ShopData.map((shop, index) => {
                console.log("shopUser.....>>>",shop)
                const rowIndex = (page - 1) * pageSize + index + 1;
                return (
                  <tr
                    key={shop.id || index}
                    className="hover:bg-blue-200 cursor-pointer"
                    onClick={() => handleRowClick(shop.id)}  
                  >
                    <td className="py-1 px-3 text-nowrap">{rowIndex}</td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.submission_date || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.start_time || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.end_time || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.user || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.device_id || "N/A"}
                      <br />
                      <span className="text-xs text-gray-400">
                        {shop.deviceInfo || ""}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-nowrap">
                      {shop.verify_phone_number || "N/A"}
                      <br />
                      <span className="text-xs text-gray-400">
                        {shop.agentInfo || ""}
                      </span>
                    </td>
                   
                    <td className="py-2 px-3 text-nowrap">
                      {shop.shop_location_latitude !== null && shop.shop_location_longitude !== null ? (
                        <a
                          href={`https://www.google.com/maps?q=${shop.shop_location_latitude},${shop.shop_location_longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => handleLocationClick(e, shop.shop_location_latitude, shop.shop_location_longitude)}
                        >
                          <Image
                          
                            width={16}
                            height={16}
                            src="/location.svg"
                            alt="Location"
                          />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    
                    <td className="py-1 px-3 text-nowrap">
                      {shop.shopImage ? (
                        <img
                          src={shop.shopImage}
                          alt="Shop"
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shop_status === 1 ? "Open" : "Close"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.signboard_upay_and_others === 1 ? "Yes" : "No"}
                    </td>
                    {/* Correctly placing the signboard_competitors_selection inside <td> */}
                    <td className="py-1 px-3 text-nowrap">
                      {shop.signboard_competitors_selection === 1
                        ? "Client"
                        : shop.signboard_competitors_selection === 2
                        ? "Bkash"
                        : shop.signboard_competitors_selection === 3
                        ? "Nagat"
                        : shop.signboard_competitors_selection === 4
                        ? "Rocket"
                        : shop.signboard_competitors_selection === 5
                        ? "Others"
                        : "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_signboard_upay_picture ? (
                        <Image
                          width={20}
                          height={20}
                          src={shop.group_signboard_upay_picture}
                          alt="Signboard"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_signboard_signboard_status || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shopscreen_shopscreen_status === 1
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shopscreen_new_shopscreen === 1
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shap_pointer_upay_shap_pointer === 1
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shap_pointer_shop_pointer_selection === 1
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shap_pointer_others_shop_pointer || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shap_pointer_picture ? (
                        <Image
                          height={12}
                          width={20}
                          src={shop.group_shap_pointer_picture}
                          alt="Shop Pointer"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_shap_pointer_shop_pointer_status || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_festoon_festoon_status === 1 ? "Yes" : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_festoon_festoon_quantity || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap flex gap-1">
                      {shop.group_festoon_festoon01 ? (
                        <Image
                          height={12}
                          width={20}
                          src={shop.group_festoon_festoon01}
                          alt="Festoon 1"
                        />
                      ) : null}
                      {shop.group_festoon_festoon02 ? (
                        <Image
                          height={12}
                          width={20}
                          src={shop.group_festoon_festoon02}
                          alt="Festoon 2"
                        />
                      ) : null}
                      {shop.group_festoon_festoon03 ? (
                        <Image
                          height={12}
                          width={20}
                          src={shop.group_festoon_festoon03}
                          alt="Festoon 3"
                        />
                      ) : null}
                      {shop.group_festoon_festoon04 ? (
                        <Image
                          height={12}
                          width={20}
                          src={shop.group_festoon_festoon04}
                          alt="Festoon 4"
                        />
                      ) : null}
                      {/* Display "N/A" if no festoon images */}
                      {!shop.group_festoon_festoon01 &&
                        !shop.group_festoon_festoon02 &&
                        !shop.group_festoon_festoon03 &&
                        !shop.group_festoon_festoon04 && (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_qr_qr_sticker || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_qr_qr_sticker_image ? (
                        <Image
                          height={20}
                          width={20}
                          src={shop.group_qr_qr_sticker_image}
                          alt="QR Sticker"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_table_sticker_sticker_image ? (
                        <div className="flex items-center">
                          <Image
                            height={12}
                            width={20}
                            src={shop.group_table_sticker_sticker_image}
                            alt="Table Sticker"
                            className="mr-1"
                          />
                          <span>Yes</span>
                        </div>
                      ) : (
                        <span>No</span>
                      )}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_table_sticker_table_sticker_quantity || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_branding_new_item_installation === 1
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_branding_poster_quantity || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_branding_dangler_quantity || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_branding_bunting_quantity || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_branding_obler_quantity || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_competitor_competitor_status === 1
                        ? "Yes"
                        : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_competitor_new_campain_list || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_competitor_others_information || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.group_competitor_comment_information || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.end_picture ? (
                        <Image
                          height={12}
                          width={20}
                          src={shop.end_picture}
                          alt="Final Image"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {shop.new_account_today || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {/* Wrap the action image inside a button for better interactivity */}

                      <Image
                        height={30}
                        width={30}
                        src="/ButtonFilled.svg"
                        alt="Action"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="40"
                  className="text-center py-1 px-3 text-nowrap font-semibold"
                >
                  No shop data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShopDataTable;
