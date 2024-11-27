import { useQuery } from "@tanstack/react-query";

const getAllInventoryItems = async (token, page, pageSize, search) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/inventory-product-based/`;

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page);
  if (pageSize) params.append("page_size", pageSize);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  try {
    const response = await fetch(url, {
     
        method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("Response itemsData :===>", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const itemsData = await response.json();
    console.log("Fetched itemsData ====>", itemsData);

    if (itemsData?.status_code >= 400) {
      return {
        status: "failed",
        message: "No data available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Data fetched successfully.",
      data: itemsData,
    };
  } catch (error) {
    console.error("Error in fetching data:", error);
    return {
      status: "failed",
      message: error.message || "Failed to fetch data.",
      data: [],
    };
  }
};

export const useAllInventoryItems = (token, page, pageSize, search) => {
  return useQuery({
    queryKey: ["get_All_Inventory_items", token, page, pageSize, search],
    queryFn: () => getAllInventoryItems(token, page, pageSize, search),
  });
};
