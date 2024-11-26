import Image from "next/image";

function CartFour({
  title,
  amount,
  groth,
  memberImg,
  totalEarnImg,
  transactionCount_state,
  transactionCount_state_loading,
  timeFrame,
  transactionCount_state_fetching,
}) {
  return (
    <div className="rounded-lg p-5 shadow-lg bg-gradient-to-b  bg-[#da9d4f]  dark:bg-darkblack-600">
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
      <div className=" text-sm font-semibold text-white  dark:text-white gap-2 flex">
          <div>
            <h1>Today</h1>
            <p>10</p>
          </div>
          <div>
            <h1 className="text-nowrap">Yesterday</h1>
            <p>10</p>
          </div>
          <div>
            <h1 className="text-nowrap">Last Week</h1>
            <p>10</p>
          </div>
          <div>
            <h1 className="text-nowrap">Last month</h1>
            <p>10</p>
          </div>

        
        </div>
    </div>
  );
}

export default CartFour;
