import { Spinner } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

function DayListTable({
  DayListData,
  isLoading,
  error,
  page, 
  pageSize
}) {

  if (isLoading) {
    return (
      <div className="text-center text-lg py-10">
        <Spinner color="default" />
      </div>
    );
  }

  if (error) {
    // If using Tailwind CSS, consider using 'text-red-500' instead of 'text-danger'
    return <div className="text-red-500">Error: {error}</div>;
  }

  const hasDayListData = DayListData && DayListData.length > 0;

  const checkToolkitItems = (items, itemNo) => {
    if (!items) {
      return '';
    }
    const itemArray = items.split(' ').map(Number);
    return itemArray.includes(itemNo) ? 'Yes' : 'No';
  };

  // Define table headers in an array for better maintainability
  const tableHeaders = [
    "SL",
    "Submit Time",
    "User Name",
    "Device ID",
    "Location",
    "Distributor House",
    "House Location",
    "POSM",
    "Shop Screen",
    "Festoon",
    "QR Sticker",
    "Table Sticker",
    "Poster",
    "Dangler",
    "Bunting",
    "Obler",
    "Toolkit",
    "Combination Pliers",
    "Hammer",
    "Duster",
    "GI Wire",
    "Anti Cutter",
    "Thread",
    "Scotch Tape",
    "Adhesive",
    "Nail",
    "Other"
  ];

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <div className="relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600 ">
        <table className="w-full min-w-[1200px] text-sm   border text-left text-gray-500 dark:text-gray-400  bg-white dark:bg-darkblack-600">
          <thead className="text-gray-700 bg-[#dde4eb] dark:bg-gray-700 dark:text-white ">
            <tr>
              {tableHeaders.map((header, idx) => (
                <th key={idx} scope="col" className="py-1 px-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-darkblack-600 dark:text-white">
            {hasDayListData ? (
              DayListData.map((dayData, index) => {
                const rowIndex = (page - 1) * pageSize + index + 1;

                return (
                  <tr
                    key={dayData.id || index}
                    className="hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="py-1 px-3 text-nowrap">{rowIndex}</td>
                    <td className="py-1 px-3 text-nowrap">{dayData.submission_date || "N/A"}</td>
                    <td className="py-1 px-3 text-nowrap">{dayData.user || "N/A"}</td>
                    <td className="py-2 px-3 text-nowrap">{dayData.device_id || "N/A"}</td>
                    <td className="py-2 px-3 text-nowrap">
                      {dayData.group_working_user_location_latitude !== null &&
                      dayData.group_working_user_location_longitude !== null ? (
                        <a
                          href={`https://www.google.com/maps?q=${dayData.group_working_user_location_latitude},${dayData.group_working_user_location_longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
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
                      {dayData.group_distributor_distributor_house ? 'Yes' : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_distributor_distributor_location_Latitude !== null &&
                      dayData.group_distributor_distributor_location_Longitude !== null ? (
                        <a
                          href={`https://www.google.com/maps?q=${dayData.group_distributor_distributor_location_Latitude},${dayData.group_distributor_distributor_location_Longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
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
                      {dayData.group_posm_posm_confirmation ? "Yes" : "No"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_shopscreen || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_festoon || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_qr_sticker || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_table_sticker || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_table_poster || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_dangler || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_bunting || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_posm_posm_obler || "N/A"}
                    </td>
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_toolkit_toolkit_confirmation === 1 ? "Yes" : "No"}
                    </td>
                    {/* Toolkit Items */}
                    {[1,2,3,4,5,6,7,8,9].map((num) => (
                      <td key={`toolkit-${num}`} className="py-1 px-3 text-nowrap">
                        {checkToolkitItems(dayData.group_toolkit_toolkit_items, num)}
                      </td>
                    ))}
                    <td className="py-1 px-3 text-nowrap">
                      {dayData.group_toolkit_others || "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                {/* Updated colSpan to match the number of headers (27) */}
                <td
                  colSpan="27"
                  className="text-center py-4 px-3 text-nowrap font-semibold"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DayListTable;
