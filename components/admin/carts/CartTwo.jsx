import Image from "next/image";

function CartTwo({
  title,
  cartData,
}) {
  return (
    <div className="rounded-lg p-5 md:-ml-8 md:w-96  pl-16  shadow-lg bg-gradient-to-b  pr-20 bg-[#F3797E] dark:bg-darkblack-600">
      <div className="mb-5 flex items-center justify-between">
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
      </div>
      <div className=" text-sm  text-center font-semibold text-white  dark:text-white gap-2 flex">
        <div>
          <h1>Today</h1>
          <p >{cartData?.today_agent||"00"}</p>
        </div>
        <div>
          <h1 className="text-nowrap">Yesterday</h1>
          <p>{cartData?.yesterday_agent||"00"}</p>
        </div>
        <div>
          <h1 className="text-nowrap">Last Week</h1>
          <p>{cartData?.last_week_agent||"00"}</p>
        </div>
        <div>
          <h1 className="text-nowrap">Last month</h1>
          <p>{cartData?.last_month_agent||"00"}</p>
        </div>
      </div>
    </div>
  );
}

export default CartTwo;
