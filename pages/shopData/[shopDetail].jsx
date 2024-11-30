import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import AdminLayout from 'components/admin/layout';
import { useShopDetails } from 'lib/hooks/admin/shopDetails/fetchShopDetails';
import cookies from 'js-cookie';
import Image from 'next/image';
import Map from 'components/Map';
import { useShopImage } from 'lib/hooks/admin/shopDetails/fetchImage';
import { Spinner } from '@nextui-org/react';

const ShopDetail = () => {
  const router = useRouter();
  const shopId = router.query.shopDetail;
  const token = cookies.get('access');
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);

  const { data, isLoading, isError, error } = useShopDetails(token, shopId);
  const { data: images, isLoading: imageisLoading, isError: imageisError, error: imgError } = useShopImage(token, id, image);  
  const shop = data?.data;

  // UseEffect for setting image from shop details
  useEffect(() => {
    if (shop?.group_shop_image) {
      setImage(shop?.group_shop_image); 
    }
    if (shop?.remote_id) {
      setId(shop?.remote_id); 
    }
  }, [shop]);

  // Loading, error or no data handling
  if (isLoading ){
    return <div className='text-gray-700'>Loading...</div>;
  }

  if (isError) {
    return <div className='text-gray-700'>Error: {error?.message || imgError?.message}</div>;
  }

  if (!data) {
    return <div className='text-gray-700'>No data found</div>;
  }

  return (
    <>
      <div className='text-gray-700 p-4 my-4'>
        <h1 className='text-black'>
          Shop Details for new: {shopId}
        </h1>
        <div>
          <h1 className='font-bold text-2xl text-center'>Agent shop Data</h1>
          <h2 className=''>
            Select the method of receiving the agent's number:
            {shop?.phone_number_scan == null && shop?.phone_number_edittext.length > 0
              ? 'By hand write'
              : 'By Scan'}
          </h2>
          <div>
            <h2 className=''>Agent's Name: {shop?.user}</h2>
            <h2 className=''>Agent's number: {shop?.verify_phone_number}</h2>
            <div className='flex gap-6'>
              <h2>Shop Location :</h2>
              {shop?.shop_location_latitude && shop?.shop_location_longitude && (
                <Map lat={shop.shop_location_latitude} lng={shop.shop_location_longitude} />
              )}
            </div>

            {/* Render the image if it exists */}
       
              <div className='mt-4'>
                <h2 className='font-bold text-lg'>Shop Image:</h2>
                {imageisLoading? <Spinner/>:
                     <img className='h-44 w-56' src={`data:image/jpeg;base64,${images?.data?.image}`}  alt="Dynamically Loaded Image" />}
      
              </div>
     
          </div>
        </div>
      </div>
    </>
  );
};

ShopDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export default ShopDetail;
