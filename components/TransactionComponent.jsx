"use client";
import React from "react";
import { useState, useEffect } from "react";
import TransactionTable from "components/admin/Tables/TransactionTable";
import Search from "components/admin/forms/Search";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Pagination,
} from "@nextui-org/react";
import cookies from "js-cookie";
import Image from "next/image";
import { useAllShopData } from "../lib/hooks/admin/transaction/fetchAllTransaction";

const numbers = ["20", "30", "40", "50", "60", "70", "80", "90", "100"];

const TransactionComponent = () => {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [inputPage, setInputPage] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [selectedValue, setSelectedValue] = useState("10");


    const token = cookies.get("access");


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

    const handleValueChange = (value) => {
        setSelectedValue(value);
        setPageSize(value);
    };

    const {
        isFetched: is_shopData_fetched,
        data: shopData_state,
        error: shopData_state_error,
        isLoading: shopData_state_loading,
        isFetching: shopData_state_fetching,
        refetch: refetch_transaction,
    } = useAllShopData(token, search, date, page, pageSize);

    const shopData = shopData_state?.data?.data;
    const current_page = shopData_state?.data?.current_page;
  
    console.log("shopData ....", shopData);
    
    if (!token) {
        return null;
    }

    const shouldShowPagination = !shopData_state && shopData?.length > 0;

    const setCurrentPage = (page_number) => {
        setPage(page_number);
        refetch_transaction();
    };

    return (
        <div className="w-full rounded-lg bg-white dark:bg-darkblack-600 p-8">
            <p className="text-gray-400 pb-3 font-semibold">All Shop Data :</p>
            <div className="flex flex-col space-y-5">
                <div className="flex h-[56px] justify-between space-x-4 mt-2">
                    <Search search={search} setSearch={setSearch} />
                </div>


                <div className="dark:bg-darkblack-600 dark:text-gray-400">
                   
                    <TransactionTable
                        ShopData={shopData_state}
                        isLoading={shopData_state_error || shopData_state_fetching}
                        loop
                        showControls
                        error={shopData_state_error}
                        currentPage={current_page}
                        pageSize={pageSize}
                    />
                </div>




                {/* {shouldShowPagination && (
                    <div className="mt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">

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
                )} */}
            </div>
        </div>
    );
}

export default TransactionComponent;