import { getShowcase } from "@/api";
import HomeComponent from "@/components/Home";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";

export default function Home() {
  const [showcase, setShowcase] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShowcase = async () => {
    try {
      const res = await getShowcase();
      setShowcase(res?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchShowcase();
  }, []);

  if (loading) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center text-center w-100"
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SEO pageTitle="HOME" />
      <Header />
      <HomeComponent showcase={showcase} />
      <Footer />
    </>
  );
}
