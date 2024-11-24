import { useQuery } from "@tanstack/react-query";

const getAllShopData = async (page,pageSize,search,token) => {
  console.log("seerch value 1111111111111",search);
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

export const useAllShopData = (page,pageSize,search,token) => {
  return useQuery({
    queryKey: ["get-all-shopData", page,pageSize,search,token],
    queryFn: () => getAllShopData(page,pageSize,search,token),
  });
};
