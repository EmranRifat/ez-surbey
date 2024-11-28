import { useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { useAllInventoryItems } from "lib/hooks/admin/inventory/fetchInventoryItems";
import cookies from "js-cookie";

function ItemsTable({ search }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [inputPage, setInputPage] = useState("");

  const token = cookies.get("access");
  const numbers = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

  const {
    isFetched: is_itemsData_fetched,
    data: itemsData_state,
    error: itemsData_state_error,
    isLoading: itemsData_state_loading,
    isFetching: itemsData_state_fetching,
  } = useAllInventoryItems(token, page, pageSize, search);

  console.log("table items-->>", itemsData_state?.data?.data);

  if (itemsData_state_error) {
    return <div className="text-red-600">Error: {itemsData_state_error}</div>;
  }

  if (itemsData_state_loading || itemsData_state_fetching) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Handle empty or no data case
  if (
    !Array.isArray(itemsData_state?.data?.data) ||
    itemsData_state.data?.data.length === 0
  ) {
    return (
      <div className="flex justify-center items-center">
        <p>No items data available or error in fetching data.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-darkblack-600">
          <thead className="text-xs text-gray-700 uppercase bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 pl-4">
                SL
              </th>
              <th scope="col" className="py-3">
                Product Name
              </th>
              <th scope="col" className="py-3">
                Total Quantity
              </th>
              <th scope="col" className="py-3">
                Used Quantity
              </th>
              <th scope="col" className="py-3">
                Unused Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsData_state?.data?.data.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                <td className="py-2 px-6 font-medium text-gray-900 dark:text-gray-200">
                  {index + 1 + (page - 1) * pageSize}
                </td>

                <td className="text-gray-700 dark:text-gray-300">
                  {item.product || "N/A"}
                </td>

                <td className="text-gray-700 dark:text-gray-300">
                  {item.total || "N/A"}
                </td>

                <td className="text-gray-700 dark:text-gray-300">
                  {item.used || "N/A"}
                </td>

                <td className="text-gray-700 dark:text-gray-300">
                  {item.unused || "N/A"}
                </td>
              </tr>
            ))}
            {/* If no data found */}
            {(!itemsData_state?.data?.data ||
              itemsData_state.data?.data.length === 0) && (
              <tr>
                <td colSpan="5" className="text-center py-3 px-6 text-gray-500">
                  No items data found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="my-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* Left-aligned controls */}
          <div className="flex justify-start items-start gap-4">
            <div className="flex items-center">
              <Autocomplete
                defaultValue={""}
                labelPlacement="outside-left"
                label={<span className="text-gray-600">Show :</span>}
                className="max-w-xs"
                placeholder={"15"}
                style={{ width: "80px", color: "black" }}
                variant="bordered"
              >
                {numbers.map((number) => (
                  <AutocompleteItem
                    key={number}
                    value={number}
                    className="text-black"
                    style={{ fontSize: "12px" }}
                  >
                    {number}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>

            <div className="flex items-center space-x-2">
              <p className="text-gray-600 text-sm">Go to page :</p>
              <input
                type="text"
                className="border border-gray-300 bg-white dark:bg-darkblack-600 rounded px-2 py-1 w-12 md:w-16 text-center text-gray-600"
                placeholder="1"
                defaultValue={inputPage}
              />

              {inputPage && (
                <Button color="primary" variant="faded" size="sm">
                  Go ≫
                </Button>
              )}
            </div>
          </div>

          {/* Centered pagination */}
          <div className="flex justify-center items-center w-full md:w-auto mt-4 md:mt-0">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={5}
              total={5}
              className="overflow-x-auto"
            />
          </div>

          {/*/////////// this part make for center pagination so keep invsible */}

          <div className="invisible">
            <div className="flex justify-start items-start gap-4">
              <div className="flex items-center">
                <Autocomplete
                  defaultValue={""}
                  labelPlacement="outside-left"
                  label={<span className="text-gray-600">Show :</span>}
                  className="max-w-xs"
                  placeholder={""}
                  style={{ width: "80px", color: "black" }}
                  variant="bordered"
                >
                  {numbers.map((number) => (
                    <AutocompleteItem
                      key={number}
                      value={number}
                      className="text-black"
                      style={{ fontSize: "12px" }}
                    >
                      {number}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>

              <div className="flex items-center space-x-2">
                <p className="text-gray-600 text-sm">Go to page :</p>
                <input
                  type="text"
                  className="border border-gray-300 bg-white dark:bg-darkblack-600 rounded px-2 py-1 w-12 md:w-16 text-center text-gray-600"
                  placeholder="1"
                  value={inputPage}
                  onChange={(e) => setInputPage(e.target.value)} // Handle input change
                />

                {inputPage && (
                  <Button color="primary" variant="faded" size="sm">
                    Go ≫
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsTable;
