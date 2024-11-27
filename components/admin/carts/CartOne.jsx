import Image from "next/image";
import Cookies from "js-cookie";
import { Spinner } from "@nextui-org/react";


function CartOne({totalAgents,title}) {





  return (
    <div className="rounded-lg p-5 shadow-lg bg-gradient-to-b md:w-64 bg-[#00CCCC] dark:bg-darkblack-600">
      <div className="mb-5  flex items-center justify-between">
        <div className="flex items-center space-x-[7px]">
          <div className="icon">
            <span>
              <Image
                priority={true}
                height={32}
                width={32}
                src="/icons/Agent.svg"
                alt="icon"
              />
            </span>
          </div>
          <span className="text-lg font-semibold text-white dark:text-white">
            {title}
          </span>
        </div>
        {/* <div>
          <Image
            priority={true}
            height={memberImg.height}
            width={memberImg.width}
            src={memberImg.src}
            alt="members"
          />
        </div> */}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <div className=" ">
            <div className="text-2xl font-bold leading-[48px] ml-20 text-white
             dark:text-white  flex">
             {totalAgents}
            </div>
          </div>

        
        </div>
         {/* <div className="w-[106px] h-[68px] ">
          <LineChart option={options} dataSet={data} refer={chartRef} />
        </div> */}
      </div>
    </div>
  );
}

export default CartOne;
