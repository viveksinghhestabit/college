import React from "react";
import styles from "./BrandsSection.module.scss";
import Image from "next/image";

const brandsImages = [
  "/assets/images/home/brands/brands-img-1.webp",
  "/assets/images/home/brands/brands-img-2.webp",
  "/assets/images/home/brands/brands-img-3.webp",
  "/assets/images/home/brands/brands-img-4.webp",
  "/assets/images/home/brands/brands-img-5.webp",
  "/assets/images/home/brands/brands-img-6.webp",
];

const BrandsSection = () => {
  return (
    <section>
      <div className="container-lg px-sm-auto px-0">
        <div className={styles.brandsSection}>
          <div className={styles.brandsSectionTop}>
            <div className="row align-items-end">
              <div className="col-sm-4">
                <div className={styles.title}>CollegeVeda</div>
                <div className={styles.subtitle}>
                  Join over 1490+ College around the Country
                </div>
              </div>
              <div className="col-sm-8">
                <div
                  className={`${styles.ratings} d-flex align-items-center justify-content-sm-start justify-content-center`}
                >
                  {[1, 2, 3, 4].map((index) => (
                    <i className="fas fa-star" key={`star-${index}`} />
                  ))}
                  <i className="far fa-star" />
                </div>
                <div className={styles.subtitle}>
                  4.5 Star Rating (20+ Review)
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.brandsImagesContainer} d-flex align-items-center justify-content-between`}
          >
            {brandsImages?.map((item, index) => (
              <Image
                draggable={false}
                src={item}
                width="0"
                height="0"
                className={`${styles.brandsImg} w-100 h-auto`}
                sizes="100vw"
                alt="brand-logo"
                key={`brands-img-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
