// ShopData.jsx
import React, { useState, useEffect } from "react";
import Search from "components/common/Search";
import cookies from "js-cookie";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import { useAllShopData } from "../../lib/hooks/admin/transaction/fetchAllShopData";
import { Autocomplete, AutocompleteItem, Button, Pagination } from "@nextui-org/react";
import ShopDataTable from "../../components/admin/Tables/ShopDataTable";
import RangeCalendarComponent from "../../components/common/RangeCalender";
import { parseDate } from "@internationalized/date"; 

function ShopData() {
  const [search, setSearch] = useState("");

  const [dateRange, setDateRange] = useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  const [formattedStartDate, setFormattedStartDate] = useState("2024-04-01");
  const [formattedEndDate, setFormattedEndDate] = useState("2024-04-08");

  const [inputPage, setInputPage] = useState("");
  const [selectedValue, setSelectedValue] = useState("10");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
    const accessToken = cookies.get("access");
    setToken(accessToken);
  }, []);



  const numbers = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

  const {
    isFetched: is_shopData_fetched,
    data: shopData_state,
    error: shopData_state_error,
    isLoading: shopData_state_loading,
    isFetching: shopData_state_fetching,
    refetch: refetch_shopData,
  } = useAllShopData(page, pageSize, search, token, formattedStartDate, formattedEndDate);



  const shopData = shopData_state?.data?.data;
  const current_page = shopData_state?.data?.current_page;

  const shouldShowPagination = !shopData_state_loading && (shopData_state?.data?.data?.length > 0 ?? false);

  console.log("shopData table LLL>>>", shopData_state?.data);

  const handleInputPageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= shopData_state?.data?.total_pages
    ) {
      setCurrentPage(pageNumber);
    }
  };


  const setCurrentPage = (page_number) => {
    setPage(page_number);
    refetch_shopData();
  };



  const handleValueChange = (value) => {
    setSelectedValue(value);
    setPageSize(parseInt(value, 10));
    setPage(1);
    refetch_shopData();
  };


  const handleDateChange = (newRange) => {
    setDateRange(newRange);
    if (newRange.start && newRange.end) {
      const formatDate = (date) => {
        const year = date.year;
        const month = String(date.month).padStart(2, '0');
        const day = String(date.day).padStart(2, '0');
        return `${day}-${month}-${year}`;
      };

      const startDate = formatDate(newRange.start);
      const endDate = formatDate(newRange.end);
      setFormattedStartDate(startDate);
      setFormattedEndDate(endDate);

      // Optionally reset to first page when date range changes
      setPage(1);
      refetch_shopData();
    }
  };

  return (
    <div className="w-full rounded-lg my-4 bg-white dark:bg-darkblack-600 p-4">
      <p className="text-gray-400 pb-1 font-semibold">All Shop Data :</p>
      <div className="flex flex-col space-y-5">
        <div className="flex space-x-4">
          {/* Pass the value and onChange props */}
          <RangeCalendarComponent value={dateRange} onChange={handleDateChange} />
          <Search search={search} setSearch={setSearch} />
        </div>

        <div className="dark:bg-darkblack-600 dark:text-gray-400">
          {isClient && token ? (
            <ShopDataTable
              ShopData={shopData}
              isLoading={shopData_state_error || shopData_state_fetching}
              loop
              showControls
              search={search}
              page={page}
              pageSize={pageSize}
              error={shopData_state_error}
              currentPage={current_page}
            />
          ) : isClient ? (
            <p className="text-red-500">No access token found.</p>
          ) : (
            // Render a placeholder that matches the server HTML
            <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
        </div>

        
{shouldShowPagination && (

    <div className="mt-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
      {/* Left-aligned controls */}
      <div className="flex justify-start items-start gap-4">
        <div className="flex items-center">
          <Autocomplete
            value={selectedValue}
            onChange={(e) => handleValueChange(e.target.value)}
            labelPlacement="outside-left"
            label={<span className="text-gray-600">Show :</span>}
            className="max-w-xs"
            placeholder={selectedValue}
            style={{ width: "60px", color: "black" }}
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
          page={current_page || 1}
          total={shopData_state?.data?.total_pages || 5}
          onChange={(page) => setCurrentPage(page)}
          className="overflow-x-auto"
        />
      </div>

      {/*/////////// this part make for center pagination so keep invisible */}
      <div className="invisible">
        <div className="flex justify-start items-start gap-4">
          <div className="flex items-center">
            <Autocomplete
              value={selectedValue}
              onChange={(e) => handleValueChange(e.target.value)}
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
              className="border border-gray-300 bg-white dark:bg-darkblack-600 rounded px-2 py-1 w-12 md:w-16 text-center dark:text-white text-gray-600"
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
      </div>
    </div>
  </div>
  )
}
      </div>
    </div>
  );
}

ShopData.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default ShopData;
