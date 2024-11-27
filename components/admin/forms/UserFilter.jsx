import { Button, divider } from "@nextui-org/react";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import AddPostMaster from "components/admin/modal/AddPostMaster";
import { ToastContainer } from "react-toastify";

function UserFilter({ search, setSearch, refetch  }) {
  const [Filter, setActiveFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { isOpen, onOpenChange } = useDisclosure();
 
  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.innerText);
  };

  return (
    <div>
       {/* <Button
        color="primary" variant="faded"
          className="rounded-lg  mx-4 font-bold  "
          onPress={() => onOpenChange(true)}
        >
          + Add Postmaster
        </Button> */}
      <div className="bg-white dark:bg-darkblack-600 rounded-lg p-4  items-center flex ">
        <div
          className="flex items-center flex-1 pl-4 xl:border-r outline  outline-gray-300 py-3 rounded-md text-gray-500 border-bgray-400 dark:border-darkblack-400 "
          style={{ outlineWidth: "1px" }}
        >
          <span className="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L17 17"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            type="text"
            className="border-0 w-full bg-white dark:bg-darkblack-600 dark:text-white focus:outline-none focus:ring-0 focus:border-none"
            placeholder=   "   Search here ...."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
      
       

        <div className="pl-8 md:block hidden">
          <button aria-label="none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.49999 1H14.5C14.644 1.05051 14.7745 1.13331 14.8816 1.24206C14.9887 1.35082 15.0695 1.48264 15.1177 1.62742C15.166 1.77221 15.1805 1.92612 15.1601 2.07737C15.1396 2.22861 15.0849 2.37318 15 2.5L9.99998 8V15L5.99999 12V8L0.999985 2.5C0.915076 2.37318 0.860321 2.22861 0.839913 2.07737C0.819506 1.92612 0.833987 1.77221 0.882249 1.62742C0.930511 1.48264 1.01127 1.35082 1.11835 1.24206C1.22542 1.13331 1.35597 1.05051 1.49999 1Z"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="pl-10 md:block hidden">
          <button
            aria-label="none"
            className="py-3 px-10 bg-bgray-600 dark:bg-darkblack-500 rounded-lg text-white font-medium text-sm"
          >
            Search
          </button>
        </div>
      </div>

      <div>
       
      
        <AddPostMaster
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          refetch={refetch}
        />

      </div>
    </div>
  );
}

export default UserFilter;
