import CollegesComponent from "@/components/Colleges";
import SEO from "@/components/Seo";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function Home() {
  return (
    <>
      <SEO pageTitle="Colleges" />
      <Header />
      <CollegesComponent />
      <Footer />
    </>
  );
}
