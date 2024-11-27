import { useQuery } from "@tanstack/react-query";

const getAllCartDataCount = async (token) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/dashboard/`;
  const params = new URLSearchParams();

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

    console.log("fetch cartdata -->>", response);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching cartData count details: ${response.statusText}`
      );
    }

    const cartDataCount = await response.json();

    console.log("cartDataCount data-->>", cartDataCount);

    // Handle error in the response payload
    if (!cartDataCount || cartDataCount?.status_code === 400) {
      return {
        status: "failed",
        message: "No cartData count available",
        data: [],
      };
    }

    // If data is available and status is success
    return {
      status: "success",
      message: "cartData count fetched successfully.",
      data: cartDataCount,
    };
  } catch (error) {
    return {
      status: "failed",
      message: error.message || "Failed to fetch cartData count.",
      data: [],
    };
  }
};


export const useAllCartdataCount = (token) => {
  return useQuery({
    queryKey: ["get_All_Cart_Count", token],
    queryFn: () => getAllCartDataCount(token),
    enabled: !!token,
  });
};

