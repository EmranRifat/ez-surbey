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
import PersonTable from "../Tables/PersonTable";
const Person_merge = ({search}) => {
  
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


//   console.log("personData table data,,,,,, ==>>",persons);

  const persons = personData_state?.data?.data;
  const haspersonsData = persons && persons.length > 0;
  const current_page = personData_state?.data?.current_page;

  const shouldShowPagination = !personData_state_loading && (persons?.length > 0 ?? false);

//   console.log("paginated personData===>", personData_state?.data?.total_pages);


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
    <div>
      <PersonTable persons={persons} haspersonsData={haspersonsData} page={page} pageSize={pageSize}/>
    
    {shouldShowPagination && (
        <div className="my-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* Left-aligned controls */}
          <div className="flex justify-start items-start gap-4">
            <div className="flex items-center">
              <Autocomplete
                defaultValue={selectedValue}
                labelPlacement="outside-left"
                label={<span className="text-gray-600"> Show :</span>}
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
    )
      }
    </div>
  );
};

export default Person_merge;
