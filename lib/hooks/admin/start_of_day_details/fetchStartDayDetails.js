import { useQuery } from "@tanstack/react-query";

// Modify the getDayDetails function to accept an object containing token and id
const getDayDetails = async ({ queryKey }) => {
  const [, token, id] = queryKey; // Destructure the queryKey to get token and id
  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/startofday-detail/`;
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

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(`Error fetching day details: ${errorText || response.statusText}`);
    }

    const dayDetails = await response.json();
    console.log("Day details response ==>>", dayDetails);

    // Check if `dayDetails` contains the data field
    if (!dayDetails?.data) {
      return {
        status: "failed",
        message: "No day details available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "Day details fetched successfully.",
      data: dayDetails.data, 
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch day details.",
      data: [],
    };
  }
};

export const useDayDetails = (token, id) => {
  return useQuery({
    queryKey: ["get_day_details", token, id],  // queryKey as an array
    queryFn: getDayDetails,  // query function
  });
};
