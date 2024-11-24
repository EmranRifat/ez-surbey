// pages/index.js or your Home component file
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";
import dynamic from "next/dynamic";
import Provider from "components/provider";

// Dynamically import MainComponent with SSR disabled
const MainComponent = dynamic(() => import("components/MainComponent"), { ssr: false });

export default function Home() {
  return (
    <Provider>
      <MainComponent />
    </Provider>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};
