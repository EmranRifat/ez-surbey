import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Pagination,
} from "@nextui-org/react";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import cookies from "js-cookie";
import { useAllInventoryPerson } from "../../../lib/hooks/admin/inventory/fetchInventoryPerson";

function PersonTable({search}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [selectedValue, setSelectedValue] = useState(pageSize.toString());
  const [inputPage, setInputPage] = useState("");

  const token = cookies.get("access");
  const numbers = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

  const {
    isFetched: is_personData_fetched,
    data: personData_state,
    error: personData_state_error,
    isLoading: personData_state_loading,
    isFetching: personData_state_fetching,
    refetch: refetch_personData,
  } = useAllInventoryPerson(token, page, pageSize, search);

  console.log("personData table==>>", personData_state?.data);

  const persons = personData_state?.data?.data;
  const haspersonsData = persons && persons.length > 0;
  const current_page = personData_state?.data?.current_page;

  const shouldShowPagination =
    !personData_state_loading && (persons?.length > 0 ?? false);

  console.log("paginated personData===>", personData_state?.data?.total_pages);

  const handleInputPageChange = (e) => {
    setInputPage(e.target.value);
  };
  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);

    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= personData_state?.data?.total_pages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  // // const currentPage = personData_state?.current_page
  const setCurrentPage = (page_number) => {
    setPage(page_number);
    refetch_personData();
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setPageSize(parseInt(value, 10));
    setPage(1);
    refetch_personData();
  };

  if (personData_state_error) {
    return (
      <div className="text-red-600">
        Error: {personData_state_error?.message}
      </div>
    );
  }

  if (personData_state_loading || personData_state_fetching) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-darkblack-600">
        <thead className="text-xs text-gray-700 uppercase bg-[#bcc3ca] dark:bg-gray-700 dark:text-white">
          {/* Main header row */}
          <tr className="border-b  border-gray-300 dark:border-gray-600">
            <th
              scope="col"
              className="py-2 px-2 text-center border border-gray-300 dark:border-gray-600"
              rowSpan="2"
            >
              SL
            </th>
            <th
              scope="col"
              className="py-2 px-4  border border-gray-300 dark:border-gray-600"
              rowSpan="2"
            >
              Agent
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              All
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              Shopscreen
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              Festoon
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              Table Sticker
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              Table Poster
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              Dangler
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              Bunting
            </th>
            <th
              scope="col"
              className="py-2 px-4 text-center border border-gray-300 dark:border-gray-600"
              colSpan="3"
            >
              Obler
            </th>
          </tr>
          {/* Subheader row for P, U, B */}
          <tr className="border-b bg-[#218d9ead] text-center border-gray-400 dark:border-gray-600">
            {[...Array(8)].map((_, index) => (
              // console.log("index===>  ", index),
              <>
                <th
                  key={`P-${index}`}
                  scope="col"
                  className="py-1 px-4 text-center border border-gray-300 dark:border-gray-600"
                >
                  P
                </th>
                <th
                  key={`U-${index}`}
                  scope="col"
                  className="py-1 px-4 text-center border border-gray-300 dark:border-gray-600"
                >
                  U
                </th>
                <th
                  key={`B-${index}`}
                  scope="col"
                  className="py-1 px-4 text-center border border-gray-300 dark:border-gray-600"
                >
                  B
                </th>
              </>
            ))}
          </tr>
        </thead>

        <tbody>
          {haspersonsData ? (
            (persons || []).map((user, index) => {
              const rowIndex = (page - 1) * pageSize + index + 1;
              return (
                <tr
                  key={rowIndex}
                  className={`hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-900"
                  }`}
                >
                  <td className="py-2 px-1 text-center font-medium  text-gray-900 dark:text-gray-200">
                    {rowIndex}
                  </td>
                  <td className="py-2 px-3 font-semibold text-nowrap text-gray-700 dark:text-gray-200">
                    {user.username || "N/A"}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.all?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.all?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.all?.B}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Shopscreen?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Shopscreen?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Shopscreen?.B}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Festoon?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Festoon?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Festoon?.B}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Table_Sticker?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Table_Sticker?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Table_Sticker?.B}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Table_Poster?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Table_Poster?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Table_Poster?.B}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Dangler?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Dangler?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Dangler?.B}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Bunting?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Bunting?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Bunting?.B}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Obler?.P}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Obler?.U}
                  </td>
                  <td className="py-2 px-3 text-center border text-gray-600 dark:text-gray-200">
                    {user.Obler?.B}
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
                No Persons data found..!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="my-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* Left-aligned controls */}
          <div className="flex justify-start items-start gap-4">
            <div className="flex items-center">
              <Autocomplete
                defaultValue={selectedValue}
                labelPlacement="outside-left"
                label={<span className="text-gray-600">Show :</span>}
                className="max-w-xs"
                placeholder={selectedValue}
                style={{ width: "80px", color: "black" }}
                variant="bordered"
              >
                {numbers.map((number) => (
                  <AutocompleteItem
                    key={number}
                    value={number}
                    className="text-black"
                    style={{ fontSize: "12px" }}
                    onClick={() => handleValueChange(number)}
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
                onChange={handleInputPageChange}
              />

              {inputPage && (
                <Button
                  onClick={handleGoToPage}
                  color="primary"
                  variant="faded"
                  size="sm"
                >
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
              page={current_page || 5}
              total={personData_state?.data?.total_pages || 5}
              onChange={(page) => setCurrentPage(page)}
              className="overflow-x-auto"
            />
          </div>

          {/*/////////// this part make for center pagination so keep invsible */}

          <div className="invisible">
            <div className="flex justify-start items-start gap-4">
              <div className="flex items-center">
                <Autocomplete
                  defaultValue={selectedValue}
                  labelPlacement="outside-left"
                  label={<span className="text-gray-600">Show :</span>}
                  className="max-w-xs"
                  placeholder={selectedValue}
                  style={{ width: "80px", color: "black" }}
                  variant="bordered"
                >
                  {numbers.map((number) => (
                    <AutocompleteItem
                      key={number}
                      value={number}
                      className="text-black"
                      style={{ fontSize: "12px" }}
                      onClick={() => handleValueChange(number)}
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
                  onChange={() => handleInputPageChange}
                />

                {inputPage && (
                  <Button
                    onClick={handleGoToPage}
                    color="primary"
                    variant="faded"
                    size="sm"
                  >
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

export default PersonTable;
