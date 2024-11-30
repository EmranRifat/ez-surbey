import { useQuery } from "@tanstack/react-query";

const getShopImage = async (token, id, name) => {

  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/get-image/`;

  console.log("url",url);
  // Use URLSearchParams to handle query parameters correctly
  const params = new URLSearchParams();

  if (id) {
    params.append('id', id);
  }
  if (name) {
    params.append('name', name);
  }

  // Append the parameters to the URL if any exist
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

    console.log("Response Image--->>", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching shop Image: ${response.statusText}`);
    }

    const shopImage = await response.json();
    console.log("image Res--->>", shopImage);

    if (!shopImage?.data || shopImage?.data.length === 0) {
      return {
        status: "failed",
        message: "No shop Image available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Shop Image fetched successfully.",
      data: shopImage?.data,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch shop Image.",
      data: [],
    };
  }
};

export const useShopImage = (token, id, name) => {
  return useQuery({
    queryKey: ["get_shop_Image", token, id, name],
    queryFn: () => getShopImage(token, id, name),
  });
};
