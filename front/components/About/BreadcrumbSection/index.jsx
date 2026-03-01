import React from "react";
import styles from "./BreadcrumbSection.module.scss";

const BreadcrumbSection = ({ title, subtitle, imgURL }) => {
  const img = imgURL || "/assets/images/common/breadcrumb-bg.webp";

  return (
    <section
      className={`${styles.breadcrumbSection} ${!imgURL ? styles.darkBg : ""}`}
      style={{
        background: `url('${img}') no-repeat center center/cover`,
      }}
    >
      <div className="container-lg d-flex align-items-start justify-content-center flex-column h-100">
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && (
          <p
            className={styles.subtitle}
            dangerouslySetInnerHTML={{
              __html: subtitle,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default BreadcrumbSection;
