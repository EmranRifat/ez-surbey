import { useQuery } from "@tanstack/react-query";

const getAllInventoryPerson = async (token, page, pageSize, search) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/inventory-user-based/`;

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

    console.log("Response personData:===>", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const personData = await response.json();
    console.log("Fetched personData====>", personData);

    if (personData?.status_code >= 400) {
      return {
        status: "failed",
        message: "No data available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Data fetched successfully.",
      data: personData,
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

export const useAllInventoryPerson = (token, page, pageSize, search) => {
  return useQuery({
    queryKey: ["get_All_Inventory_Person", token, page, pageSize, search],
    queryFn: () => getAllInventoryPerson(token, page, pageSize, search),
  });
};
