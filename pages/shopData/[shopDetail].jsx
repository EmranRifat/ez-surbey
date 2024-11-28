import React from 'react';
import { useRouter } from 'next/router';
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";

const shopDetail = () => {
    const router = useRouter();
    const  shopDetail = router.query.shopDetail;
   
    return (
        <>
              <h1 className='text-black'> Shop Details for new :{shopDetail} </h1> 
        </>
    );
};






shopDetail.getLayout = function getLayout(page) {
    return (
      <Layout>
        <AdminLayout>{page}</AdminLayout>
      </Layout>
    );
  };
  
export default shopDetail;