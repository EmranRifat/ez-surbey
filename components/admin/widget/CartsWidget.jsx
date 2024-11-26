import CartOne from "../carts/CartOne";
import CartTwo from "../carts/CartTwo";
import CartThree from "../carts/CartThree";
import CartFour from "../carts/CartFour";
import Cookies from "js-cookie";
import useAllCartDataCount from "lib/hooks/admin/home/fetchAllCartdataCount.js";

function CartsWidget({ timeFrame }) {
  const token = Cookies.get("access");
  console.log("tokennnnnn___>>>>", token);
  // console.log("timeFrame one===>>", timeFrame, token);
  function formatCurrentDate(date) {
    const currentDate = date;

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  let end_date = formatCurrentDate(new Date());
  let start_date = "2024-01-1 12:30:45";

  if (timeFrame === "monthly") {
    start_date = formatCurrentDate(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );
  } else if (timeFrame === "weekly") {
    start_date = formatCurrentDate(
      new Date(new Date().setDate(new Date().getDate() - 7))
    );
  } else if (timeFrame === "daily") {
    start_date = formatCurrentDate(
      new Date(new Date().setDate(new Date().getDate() - 1))
    );
  } else if (timeFrame === "hourly") {
    start_date = formatCurrentDate(
      new Date(new Date().setHours(new Date().getHours() - 1))
    );
  } else if (timeFrame === "fortnightly") {
    start_date = formatCurrentDate(
      new Date(new Date().setDate(new Date().getDate() - 15))
    );
  } else if (timeFrame === "yearly") {
    start_date = formatCurrentDate(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
  }

  // const {
  //   isFetched: is_CartData_fetched,
  //   data: CartData_state,
  //   error: CartData_state_error,
  //   isLoading: CartData_state_loading,
  //   isFetching: CartData_state_fetching,
  //   refetch: refetch_CartData,
  // } = useAllCartDataCount(token);

  return (
    <div className="mb-[24px] w-full relative">
      <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-5">
        <CartOne
          timeFrame={timeFrame}
          title="Total Agents"
          amount="7,245.00"
          groth="+ 3.5%"
          id="totalAgents"
        />

        <CartTwo
          timeFrame={timeFrame}
          title="Total Active Agent"
          amount="3,246.00"
          groth="+ 3.5%"
          id="totalActive"
        />

        <CartThree
          timeFrame={timeFrame}
          title="Total Shop"
          amount="5,245.00"
          groth="+ 3.5%"
          id="totalShop"
        />

        <CartFour
          timeFrame={timeFrame}
          title="Total Visited Shop"
          amount="245.00"
          groth="+ 3.5%"
          id="totalvisited"
        />
      </div>
    </div>
  );
}

export default CartsWidget;
