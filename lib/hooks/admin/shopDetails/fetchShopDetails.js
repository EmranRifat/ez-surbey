import { useQuery } from "@tanstack/react-query";

const getShopDetails = async (token, id) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/shopdata-detail/`;
  if (id) {
    url += `?id=${id}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const shopDetails = await response.json();
    console.log("shopDetails response ==>>", shopDetails);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching shop details: ${response.statusText}`);
    }

    if (!shopDetails?.data) {
      return {
        status: "failed",
        message: "No shop details available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Shop details fetched successfully.",
      data: shopDetails?.data,
    };
    
  } catch (error) {
    console.error("Error:", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch shop details.",
      data: [],
    };
  }
};

export const useShopDetails = (token, id) => {
  return useQuery({
    queryKey: ["get_shop_details", token || "", id || ""],
    queryFn: () => getShopDetails(token, id),
  });
};
