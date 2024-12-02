import { useState } from "react";
import {
  Button,
  Link,
  Pagination,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

function UsersListTable({

  Users_state,
  isLoading,
  error,
 
  page,
  pageSize,

}) {
  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
console.log("Users_state", Users_state);
  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-white dark:bg-darkblack-600">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-darkblack-600">
          <thead className="text-xs text-gray-700 uppercase bg-[#dde4eb] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 pl-4">
                SL
              </th>
              <th scope="col" className="py-3">
                Name
              </th>
            
              <th scope="col" className="py-3">
                Phone
              </th>
              <th scope="col" className="py-3">
                UserName
              </th>
              <th scope="col" className="py-3">
                Email
              </th>
              <th scope="col" className="py-3">
                Role
              </th>
              <th scope="col" className="py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
  {(Users_state?.data || []).map((user, index) => (
    <tr
      key={user.id || index}
      className={`hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer ${
        index % 2 === 0
          ? "bg-gray-50 dark:bg-gray-800"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <td className="py-2 px-6 font-medium text-gray-900 dark:text-gray-200">
        {index + 1 + (page - 1) * pageSize}
      </td>

      <td className="py-2 font-semibold text-gray-700 dark:text-gray-200 flex gap-1">
        {user.name || "N/A"}
      </td>

      <td className="text-gray-700 dark:text-gray-300">
        {user.phone || "N/A"}
      </td>
      
      <td className="py-2 font-semibold text-gray-700 dark:text-gray-200 flex gap-1">
        {user.username || "N/A"}
      </td>

      <td className="text-gray-700 dark:text-gray-300">
        {user.email || "N/A"}
      </td>
      <td className="py-2 text-gray-600 dark:text-gray-200">
        {user.roles?.[0]?.role_name || "N/A"}
      </td>
      <td className="text-gray-700 dark:text-gray-300">
        <Button
          color="primary"
          variant="faded"
          size="sm"
          radius="full"
          className="text-green-500 hover:text-blue-700"
        >
          Active
        </Button>
        <Button
          color="primary"
          variant="faded"
          size="sm"
          radius="full"
          className="ml-2 text-red-500 hover:text-green-700"
        >
          Deactive
        </Button>
        <Link className="ml-2 text-xs text-blue-500 hover:text-green-700">
          ResetPassword
        </Link>
      </td>
    </tr>
  ))}
  {(!Users_state?.data || Users_state.data.length === 0) && (
    <tr>
      <td colSpan="6" className="text-center py-3 px-6 text-gray-500">
        No users found
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default UsersListTable;
