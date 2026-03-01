import React from "react";
import styles from "./BlogsSidebarSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

const BlogsSidebarSection = ({ blogs }) => {
  return (
    <div className={`${styles.sidebar} p-4`}>
      <div className={`${styles.title} mb-3`}>Recent Post</div>
      <div className={styles.sidebarList}>
        {blogs?.slice(0, 3)?.map((item, index) => (
          <div key={`blog-${index}`} className={`${styles.sidebarItem} mb-3`}>
            <div className="row align-items-stretch">
              <div className="col-4">
                <Image
                  src={item?.blogPic}
                  width="0"
                  height="0"
                  className="w-100 h-auto"
                  sizes="100vw"
                  alt="brand-logo"
                  draggable={false}
                />
              </div>
              <div className="col-8">
                <div className={`${styles.date} mb-0`}>
                  {moment(item?.createdAt).format("DD MMMM YYYY")}
                </div>
                <Link
                  href={`/blogs/${item?.slug}`}
                  className={`${styles.blogTitle}`}
                >
                  {item?.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsSidebarSection;
