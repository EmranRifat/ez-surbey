import { useQuery } from "@tanstack/react-query";

const getAllShopData = async (page, pageSize, search, token, formattedStartDate, formattedEndDate) => {
  
  // console.log("date value 1111111111111",formattedStartDate, formattedEndDate);
  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/get-shop-data-list/`;
  if (page) {
    url += `?page=${page}`;
  }
  if (pageSize) {
    url += `&page_size=${pageSize}`;
  }
  if (search) {
    url += `&search=${search}`;
  }
  if (formattedStartDate) {
    url += `&start_date =${formattedStartDate}`;
  }
  if (formattedEndDate) {
    url += `&end_date =${formattedEndDate}`;
  }


  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });


    console.log("shopData response ---> ", response);


    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching shopData details: ${response.statusText}`);
    }

    const shopData = await response.json();
    console.log("shopDatas res data  ==>>", shopData?.data);

    if (!shopData?.data || shopData?.data.length === 0) {
      return {
        status: "failed",
        message: "No shopData available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "shopData fetched successfully.",
      data: shopData,
    };
  } 
  catch (error) {
    console.error("error", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch shopData.",
      data: [],
    };
  }
};

export const useAllShopData = (page, pageSize, search, token, formattedStartDate, formattedEndDate) => {
  return useQuery({
    queryKey: ["get-all-shopData", page, pageSize, search, token, formattedStartDate, formattedEndDate],
    queryFn: () => getAllShopData(page, pageSize, search, token, formattedStartDate, formattedEndDate),
  });
};
