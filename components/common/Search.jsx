import Image from "next/image";

function Search({ search, setSearch }) {
  return (
    <div className="hidden h-12 md:w-2/4 rounded-lg border-2 bg-bgray-100 px-[18px]  focus-within:border-success-300 dark:bg-darkblack-500 sm:block sm:w-full  ">
      <div className="flex h-full w-full items-center space-x-[15px]">
        <span>
          <Image height={22} width={22} src="/logo/search.svg" alt="" />
        </span>

        <label htmlFor="listSearch" className="w-full">
          <input
            type="text"
            id="listSearch"
            placeholder="Search here ..."
            className="search-input w-full border-none bg-bgray-100 px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-medium placeholder:text-primary-500 focus:outline-none focus:ring-0 dark:bg-darkblack-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default Search;
