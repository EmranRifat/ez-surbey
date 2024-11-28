import React from 'react';
import { useRouter } from 'next/router';
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
const shopDetails = () => {
    const router = useRouter();
    const  shopDetails = router.query.shopDetails;
    return (
        <>
              <h1 className='text-black'>Shop Details for new 2222:{shopDetails} </h1> 
        </>
    );
};

shopDetails.getLayout = function getLayout(page) {
    return (
      <Layout>
        <AdminLayout>{page}</AdminLayout>
      </Layout>
    );
  };
  
export default shopDetails;