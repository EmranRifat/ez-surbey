import Image from "next/image";

function CartFour({
  title,  
  cartData
}) {
  return (
    <div className="rounded-lg p-5 shadow-lg md:w-96 bg-gradient-to-b pl-16 md:ml-12  bg-[#da9d4f]  dark:bg-darkblack-600">
      <div className="mb-5  flex items-center justify-between">
        <div className="flex items-center space-x-[7px]">
          <div className="icon">
            <span>
              <Image
                priority={true}
                height={32}
                width={32}
                src="/icons/shop.svg"
                alt="icon"
              />
            </span>
          </div>
          <span className="text-lg font-semibold text-white dark:text-white">
            {title}
          </span>
        </div>
       </div>
        <div className=" text-sm font-semibold text-center text-white  dark:text-white gap-2 flex">
          <div>
            <h1>Today</h1>
            <p>{cartData?.today_shop}</p>
          </div>
          <div>
            <h1 className="text-nowrap">Yesterday</h1>
            <p>{cartData?.yesterday_shop}</p>
          </div>
          <div>
            <h1 className="text-nowrap">Last Week</h1>
            <p>{cartData?.last_week_shop}</p>
          </div>
          <div>
            <h1 className="text-nowrap">Last month</h1>
            <p>{cartData?.last_month_shop}</p>
          </div>

        
        </div>
    </div>
  );
}

export default CartFour;
