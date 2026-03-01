import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import styles from "./BlogDetailsPage.module.scss";
import { GetFirstParaFromRichText } from "@/utils/helper";
import { useRouter } from "next/router";
import { getBlogById } from "@/api";
import Loader from "../common/Loader";

const BlogDetailsComponent = () => {
  const router = useRouter();
  const blogSlug = router?.query?.slug;

  const [blogDetails, setBlogDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getBlogDetails = async (blogSlug) => {
    try {
      const res = await getBlogById(blogSlug);
      setBlogDetails({ ...res?.data?.data });
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (blogSlug) {
      setLoading(true);
      getBlogDetails(blogSlug);
    }
  }, [blogSlug]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-lg">
      <div className={`${styles.blogContainer} mb-4`}>
        <Image
          src={blogDetails?.blogPic}
          width="0"
          height="0"
          className={`${styles.blogPic} w-100 h-auto`}
          sizes="100vw"
          alt="brand-logo"
          draggable={false}
        />
        <div className="py-4">
          <div
            className={`${styles.blogDetails} d-flex align-items-center justify-content-start gap-4 mb-4`}
          >
            <div className={styles.detailContainer}>
              <i class="far fa-calendar-check me-1" />{" "}
              {moment(blogDetails?.createdAt)?.format("LLLL")}
            </div>
            <div className={`${styles.detailContainer} text-uppercase`}>
              <i class="far fa-user me-1" /> {blogDetails?.author}
            </div>
          </div>
          <div className={`${styles.blogTitle} mb-3`}>{blogDetails?.title}</div>
          <div
            className={`${styles.blogData} mb-3`}
            dangerouslySetInnerHTML={{
              __html: blogDetails?.body,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsComponent;
