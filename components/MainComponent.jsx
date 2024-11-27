"use client";
import React from "react";
import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import CartsWidget from "components/admin/widget/CartsWidget";
import ApexChart from "components/admin/chart/HomeBarChart";
import HomeLineChart from "./admin/chart/HomeLineChart";

const MainComponent = () => {
    
  const [timeFrame, setTimeFrame] = useState("monthly");

  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
  };
  return (
    <main className="w-full px-4 pb-6 sm:pt-10 lg:pt-14 xl:px-8 xl:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-4 px-1">
        <h2 className="text-gray-600 text-lg sm:text-xl">At A Glance</h2>
        {/* <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              className="font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-[#5fdfd8] text-white"
              color="primary"
              variant="faded"
            >
              {timeFrame} ⌵
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            className="text-[#223C55] shadow-lg rounded-lg border border-gray-300 bg-white mt-1"
            aria-label="Time Frame Selection"
          >
            <DropdownItem
              key="hourly"
              onClick={() => handleTimeFrameChange("hourly")}
              className="py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Hourly
            </DropdownItem>
            <DropdownItem
              key="daily"
              onClick={() => handleTimeFrameChange("daily")}
              className="py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Daily
            </DropdownItem>
            <DropdownItem
              key="weekly"
              onClick={() => handleTimeFrameChange("weekly")}
              className="py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Weekly
            </DropdownItem>
            <DropdownItem
              key="monthly"
              onClick={() => handleTimeFrameChange("monthly")}
              className="py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Monthly
            </DropdownItem>
            <DropdownItem
              key="fortnightly"
              onClick={() => handleTimeFrameChange("fortnightly")}
              className="py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Fortnightly
            </DropdownItem>
            <DropdownItem
              key="yearly"
              onClick={() => handleTimeFrameChange("yearly")}
              className="py-2 px-4 hover:bg-gray-100 transition-colors"
            >
              Yearly
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </div>

      <div className="2xl:flex 2xl:space-x-12 relative">
        <div className="mb-6 2xl:mb-0 2xl:flex-1">
          <CartsWidget timeFrame={timeFrame} />

          <div className="mb-6 xl:flex xl:space-x-6 pt-6 flex-wrap space-y-6">
            <ApexChart timeFrame={timeFrame} />
            <HomeLineChart />

           
          </div>
          <div className="pt-6">{/* <TransactionComponent /> */}</div>
        </div>
      </div>
    </main>
  );
};

export default MainComponent;
