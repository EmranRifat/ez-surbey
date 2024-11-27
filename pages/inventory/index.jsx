import { useEffect, useState } from "react";
import cookies from "js-cookie";
import UserFilter from "components/admin/forms/UserFilter";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Pagination,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import PersonTable from "../../components/admin/Tables/PersonTable";
import ItemsTable from "../../components/admin/Tables/ItemTable";


function Inventory() {
  
  const token = cookies.get("access");
  const [search, setSearch] = useState("");
 
  

  return (

    
    <div className="w-full rounded-lg mt-6 bg-white dark:bg-darkblack-600 ">
      <div>
        <div className="">
          <UserFilter
            search={search}
            setSearch={setSearch}
            refetch={""}
          />
        </div>
        <div className="flex w-full flex-col px-4">
      <Tabs  aria-label="Options">
        <Tab className="shadow-none outline-none" key="persons" title="Persons">
          <Card  className="shadow-none -mx-5">
            <CardBody >
             <PersonTable search={search}/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="item" title="Items">
          <Card>
            <CardBody>
             <ItemsTable/>
            </CardBody>
          </Card>  
        </Tab>
      
      
        {/* <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab> */}
      </Tabs>
    </div>  
      </div>






{/* 
        <div className="mt-6 px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="flex justify-start items-start gap-4">
              <div className="flex items-center">
                <Autocomplete
                  defaultValue={selectedValue}
                  labelPlacement="outside-left"
                  label={<span className="text-gray-600">Show :</span>}
                  className="max-w-xs"
                  placeholder={selectedValue}
                  style={{ width: "80px", color: "black" }}
                  variant="bordered"
                >
                  {numbers.map((number) => (
                    <AutocompleteItem
                      key={number}
                      value={number}
                      className="text-black"
                      style={{ fontSize: "12px" }}
                      onClick={() => handleValueChange(number)}
                    >
                      {number}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>

              <div className="flex items-center space-x-2">
                <p className="text-gray-600 text-sm">Go to page :</p>
                <input
                  type="text"
                  className="border border-gray-300 bg-white dark:bg-darkblack-600 rounded px-2 py-1 w-12 md:w-16 text-center text-gray-600"
                  placeholder="1"
                  value={inputPage}
                  onChange={handleInputPageChange}
                />
                {inputPage && (
                  <Button
                    onClick={handleGoToPage}
                    color="primary"
                    variant="faded"
                    size="sm"
                  >
                    Go ≫
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center w-full md:w-auto mt-4 md:mt-0">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={current_page || 1}
                total={current_page?.data?.total_pages || 5}
                onChange={(page) => setCurrentPage(page)}
                className="overflow-x-auto"
              />
            </div>

            <div className="invisible">
              <div className="flex justify-start items-start gap-4">
                <div className="flex items-center">
                  <Autocomplete
                    defaultValue={selectedValue}
                    labelPlacement="outside-left"
                    label={<span className="text-gray-600">Show :</span>}
                    className="max-w-xs"
                    placeholder={selectedValue}
                    style={{ width: "80px", color: "black" }}
                    variant="bordered"
                  >
                    {numbers.map((number) => (
                      <AutocompleteItem
                        key={number}
                        value={number}
                        className="text-black"
                        style={{ fontSize: "12px" }}
                        onClick={() => handleValueChange(number)}
                      >
                        {number}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                <div className="flex items-center space-x-2">
                  <p className="text-gray-600 text-sm">Go to page :</p>
                  <input
                    type="text"
                    className="border border-gray-300 bg-white dark:bg-darkblack-600 rounded px-2 py-1 w-12 md:w-16 text-center text-gray-600"
                    placeholder="1"
                    value={inputPage}
                    onChange={handleInputPageChange}
                  />
                  {inputPage && (
                    <Button
                      onClick={handleGoToPage}
                      color="primary"
                      variant="faded"
                      size="sm"
                    >
                      Go ≫
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
     */}


    </div>
  );
}

Inventory.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default Inventory;
