import { useContext, useState } from "react";
import SearchBar from "../forms/SearchBar";
import Author from "./Author";
import MassagePopup from "./MassagePopup";
import NotificationPopup from "./NotificationPopup";
import ProfilePopup from "./ProfilePopup";
import StorePopUp from "./StorePopUp";
import ToggleBtn from "./ToggleBtn";
import ModeToggler from "./ModeToggler";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { logout_user } from "lib/store/admin/action";
import { useTopTransList } from "lib/hooks/admin/transaction/fetchTopTransaction";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "lib/context/ContextProvider";
import Cookies from "js-cookie";

function HeaderOne({ handleSidebar, showToggleButton }) {
  const { user } = useContext(UserContext);
  // console.log("user context data ==>>", user);

  const [popup, setPopup] = useState({
    notification: false,
    massage: false,
    profile: false,
    store: false,
  });

  const router = useRouter();

  //  console.log("context user ", user);

  const handlePopup = (name) => {
    setPopup({ ...popup, [name]: !popup[name] });
  };

  const handleLogout = async () => {
    router.push("/login");
    Cookies.remove("access");
    Cookies.remove("refresh");
  };

  const goToSettings = async () => {
    router.push("/admin/settings");
  };

  return (
    <header className="header-wrapper z-30 hidden w-full md:block bg-[#3f668db0]">
      <div className=" flex  h-[70px] w-full justify-between items-center sticky  px-10 dark:bg-darkblack-400 2xl:px-[76px]">
        <div className="flex gap-4">
          <Link href="/">
            <Image width={36} height={36} src="/Logo.svg" alt="logo" />
          </Link>
          <h1 className="mt-2 font-semibold ">ezSurvey-Dashboard</h1>
        </div>

        {/* <Link href="/">
          <Image
            width={110}
            height={110}
            src="/logo/bird-emts.svg"
            alt="logo"
          />
        </Link> */}

        {/* page-title */}
        {/* <div className="">
          <h3 className="text-xl font-bold text-white dark:text-bgray-50 lg:text-2xl ">
            Dashboard
          </h3>
          <p className="text-xs font-medium text-gray-700  dark:text-bgray-50 lg:text-sm ">
            Let’s check your update today
          </p>
        </div> */}
        {/* search-bar */}
        {/* <SearchBar /> */}

        {/* quick access */}

        <div className="quick-access-wrapper relative ">
          <div className="flex items-center space-x-[43px]">
            <div className="hidden h-[48px] w-[1px] bg-bgray-300 dark:bg-darkblack-400"></div>
            {/* author */}

            {/* <Author showProfile={handlePopup} /> */}

            {/* <NavbarContent as="div" className="justify-end " justify="end"> */}

            <div className="hidden items-center  xl:flex w-400">
              <ModeToggler />

              <ToggleBtn
                name="notification"
                clickHandler={handlePopup}
                icon={
                  <svg
                    className="fill-white dark:fill-white"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.9718 6.78149L19.2803 7.07178L19.9718 6.78149ZM19.3571 7.25473C19.5174 7.63666 19.957 7.81631 20.3389 7.65599C20.7209 7.49567 20.9005 7.05609 20.7402 6.67416L19.3571 7.25473ZM16.7784 2.77061C16.3937 2.61687 15.9573 2.80404 15.8036 3.18867C15.6498 3.5733 15.837 4.00973 16.2216 4.16347L16.7784 2.77061ZM16.6672 3.53388L16.3889 4.23031L16.6672 3.53388ZM4.0768 6.78149L4.76834 7.07178L4.0768 6.78149ZM3.30846 6.67416C3.14813 7.05609 3.32778 7.49567 3.70971 7.65599C4.09164 7.81631 4.53122 7.63666 4.69154 7.25473L3.30846 6.67416ZM7.82701 4.16347C8.21164 4.00973 8.39881 3.5733 8.24507 3.18867C8.09134 2.80405 7.65491 2.61687 7.27028 2.77061L7.82701 4.16347ZM7.38142 3.53388L7.10305 2.83745V2.83745L7.38142 3.53388ZM18.2395 9.93743L17.4943 10.0221V10.0221L18.2395 9.93743ZM18.6867 13.8746L19.4319 13.7899V13.7899L18.6867 13.8746ZM5.31328 13.8746L4.56807 13.7899L5.31328 13.8746ZM5.76046 9.93743L6.50567 10.0221L5.76046 9.93743ZM4.44779 15.83L3.87686 15.3436H3.87686L4.44779 15.83ZM19.5522 15.83L18.9813 16.3164L18.9813 16.3164L19.5522 15.83ZM14.2699 5.33931H13.5199C13.5199 5.65996 13.7238 5.94513 14.0272 6.04893L14.2699 5.33931ZM9.73005 5.33931L9.97284 6.04893C10.2762 5.94513 10.4801 5.65996 10.4801 5.33931H9.73005ZM15.7022 21.2175C15.8477 20.8296 15.6512 20.3973 15.2634 20.2518C14.8755 20.1064 14.4432 20.3029 14.2978 20.6907L15.7022 21.2175ZM9.70223 20.6907C9.55678 20.3029 9.12446 20.1064 8.73663 20.2518C8.34879 20.3973 8.15231 20.8296 8.29777 21.2175L9.70223 20.6907ZM19.2803 7.07178L19.3571 7.25473L20.7402 6.67416L20.6634 6.4912L19.2803 7.07178ZM16.2216 4.16347L16.3889 4.23031L16.9456 2.83745L16.7784 2.77061L16.2216 4.16347ZM20.6634 6.4912C19.9638 4.82468 18.6244 3.50849 16.9456 2.83745L16.3889 4.23031C17.6948 4.7523 18.7364 5.77599 19.2803 7.07178L20.6634 6.4912ZM3.38526 6.4912L3.30846 6.67416L4.69154 7.25473L4.76834 7.07178L3.38526 6.4912ZM7.27028 2.77061L7.10305 2.83745L7.65979 4.23031L7.82701 4.16347L7.27028 2.77061ZM4.76834 7.07178C5.31227 5.77599 6.35384 4.7523 7.65979 4.23031L7.10305 2.83745C5.4242 3.50849 4.08481 4.82468 3.38526 6.4912L4.76834 7.07178ZM17.7772 18.2056H6.22281V19.7056H17.7772V18.2056ZM17.4943 10.0221L17.9415 13.9592L19.4319 13.7899L18.9847 9.85279L17.4943 10.0221ZM6.05849 13.9592L6.50567 10.0221L5.01526 9.85279L4.56807 13.7899L6.05849 13.9592ZM5.01872 16.3164C5.59608 15.6386 5.96025 14.8241 6.05849 13.9592L4.56807 13.7899C4.50522 14.3432 4.2708 14.8812 3.87686 15.3436L5.01872 16.3164ZM17.9415 13.9592C18.0398 14.8241 18.4039 15.6386 18.9813 16.3164L20.1231 15.3436C19.7292 14.8812 19.4948 14.3432 19.4319 13.7899L17.9415 13.9592ZM6.22281 18.2056C5.5675 18.2056 5.10418 17.8817 4.89044 17.5053C4.68417 17.1421 4.68715 16.7056 5.01872 16.3164L3.87686 15.3436C3.11139 16.2422 3.0877 17.3685 3.5861 18.2461C4.07704 19.1105 5.04975 19.7056 6.22281 19.7056V18.2056ZM17.7772 19.7056C18.9503 19.7056 19.923 19.1105 20.4139 18.2461C20.9123 17.3685 20.8886 16.2422 20.1231 15.3436L18.9813 16.3164C19.3129 16.7056 19.3158 17.1421 19.1096 17.5053C18.8958 17.8817 18.4325 18.2056 17.7772 18.2056V19.7056ZM15.0199 5.33931V5.23567H13.5199V5.33931H15.0199ZM18.9847 9.85279C18.7054 7.39374 16.8802 5.43969 14.5127 4.6297L14.0272 6.04893C15.9445 6.70491 17.2914 8.23516 17.4943 10.0221L18.9847 9.85279ZM10.4801 5.33931V5.23567H8.98005V5.33931H10.4801ZM6.50567 10.0221C6.70863 8.23516 8.05551 6.70491 9.97284 6.04893L9.48727 4.6297C7.1198 5.43969 5.29456 7.39374 5.01526 9.85279L6.50567 10.0221ZM12 3.71741C12.84 3.71741 13.5199 4.39768 13.5199 5.23567H15.0199C15.0199 3.56821 13.6673 2.21741 12 2.21741V3.71741ZM12 2.21741C10.3327 2.21741 8.98005 3.56821 8.98005 5.23567H10.4801C10.4801 4.39768 11.16 3.71741 12 3.71741V2.21741ZM14.2978 20.6907C13.9752 21.5508 13.0849 22.2026 12 22.2026V23.7026C13.6851 23.7026 15.1514 22.686 15.7022 21.2175L14.2978 20.6907ZM12 22.2026C10.9151 22.2026 10.0248 21.5508 9.70223 20.6907L8.29777 21.2175C8.84856 22.686 10.3149 23.7026 12 23.7026V22.2026Z" />
                  </svg>
                }
              />
            </div>

            <div className="flex gap-2">
              <p className="text-white mt-1 text-sm ">{user?.userName}</p>

              <Dropdown
                className="bg-white shadow-lg outline-none rounded-lg"
                placement="bottom-end"
              >
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="accent"
                    name={user.userType}
                    size="sm"
                  />
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="Profile Actions"
                  className="py-2 px-4 rounded-lg shadow-lg bg-white"
                >
                  {/* <DropdownItem
                  onClick={goToSettings}
                    key="settings"
                    className="py-2 px hover:bg-gray-100 rounded-md"
                  >
                    My Settings
                  </DropdownItem> */}
                  <DropdownItem
                    key="logout"
                    className="py-2  text-red-600 font-bold hover:bg-red-100 rounded-md"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* </NavbarContent> */}
          </div>
          {/* <NotificationPopup
            active={popup.notification}
            handlePopup={handlePopup}
          /> */}

          {/* <MassagePopup active={popup.massage} handlePopup={handlePopup} />
          <StorePopUp active={popup.store} handlePopup={handlePopup} /> */}

          <ProfilePopup active={popup.profile} handlePopup={handlePopup} />
        </div>
      </div>
    </header>
  );
}

export default HeaderOne;
