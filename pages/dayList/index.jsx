import React, { useState, useEffect } from "react";
import Search from "components/common/Search";
import cookies from "js-cookie";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Pagination,
} from "@nextui-org/react";
import DayListTable from "../../components/admin/Tables/DayListTable";
import { useAllDayListData } from "../../lib/hooks/admin/transaction/fetchAllDayListData";
import RangeCalendarComponent from "../../components/common/RangeCalender";
import { parseDate } from "@internationalized/date";

function DayList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [inputPage, setInputPage] = useState("");
  const [selectedValue, setSelectedValue] = useState("10");
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [formattedStartDate, setFormattedStartDate] = useState("19-11-2024");
  const [formattedEndDate, setFormattedEndDate] = useState("25-11-2024");
  const [dateRange, setDateRange] = useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  useEffect(() => {
    setIsClient(true);
    const accessToken = cookies.get("access");
    setToken(accessToken);
  }, []);

  const numbers = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
  // console.log("dateRange >>>", formattedStartDate, formattedEndDate);
  const {
    isFetched: is_dayList_fetched,
    data: dayList_state,
    error: dayList_state_error,
    isLoading: dayList_state_loading,
    isFetching: dayList_state_fetching,
    refetch: refetch_dayList,
  } = useAllDayListData(
    token,
    search,
    page,
    pageSize,
    formattedStartDate,
    formattedEndDate
  );

  const dayListData = dayList_state?.data?.data;
  const current_page = dayList_state?.current_page;

  const shouldShowPagination =
    !dayList_state_loading && (dayListData?.length > 0 ?? false);

  // console.log("total pages >>>>", dayList_state?.data?.total_pages);


  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= dayList_state?.data?.total_pages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const handleInputPageChange = (e) => {
    setInputPage(e.target.value);
  };

  // // const currentPage = dayList_state?.current_page
  const setCurrentPage = (page_number) => {
    setPage(page_number);
    refetch_dayList();
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setPageSize(parseInt(value, 10));
    setPage(1);
    refetch_dayList();
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
    if (newRange.start && newRange.end) {
      const formatDate = (date) => {
        const year = date.year;
        const month = String(date.month).padStart(2, "0");
        const day = String(date.day).padStart(2, "0");
        return `${day}-${month}-${year}`;
      };
      const startDate = formatDate(newRange.start);
      const endDate = formatDate(newRange.end);
      // console.log(`start_date: ${startDate}, end_date: ${endDate}`);
      setFormattedStartDate(startDate);
      setFormattedEndDate(endDate);
      setPage(1);
      refetch_dayList();
    }
  };

  return (
    <div className="w-full rounded-lg bg-white mb-8 dark:bg-darkblack-600 p-8 mt-4">
      <p className="text-gray-400 pb-3 font-semibold">Start Day List :</p>
      <div className="flex flex-col space-y-5">
        <div className="flex space-x-4">
          <RangeCalendarComponent
            value={dateRange}
            onChange={handleDateChange}
          />
          <Search search={search} setSearch={setSearch} />
        </div>

        <div className="dark:bg-darkblack-600 dark:text-gray-400">
          {isClient && token ? (
            <DayListTable
              DayListData={dayListData}
              isLoading={dayList_state_error || dayList_state_fetching}
              loop
              showControls
              error={dayList_state_error}
              currentPage={current_page}
              pageSize={pageSize}
              page={page}
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
                  total={dayList_state?.data?.total_pages || 5}
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
        )}
      </div>
    </div>
  );
}

DayList.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default DayList;
