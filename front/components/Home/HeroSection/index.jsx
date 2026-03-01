import React from "react";
import styles from "./HeroSection.module.scss";
import { sliderData } from "@/constants/heroSliderData";
import CustomSlick from "@/components/common/CustomSlick";
import { useRouter } from "next/router";
import Link from "next/link";

const HeroSectionSlide = ({ data }) => {
  const router = useRouter();

  const handleGetStartedBtnClick = () => {
    router.push("/colleges");
  };

  return (
    <div
      className={styles.heroSlide}
      style={{
        background: `url(${data?.image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.overlay}>
        <div
          className={`${styles.heroContainer} d-flex flex-column align-items-center justify-content-center text-center`}
        >
          <div className={styles.title}>{data?.title}</div>
          <div className={styles.subtitle}>{data?.subtitle}</div>
          <div
            className={`${styles.heroButtonsContainer}  d-flex align-items-center justify-content-center`}
          >
            <button
              className={`${styles.primaryButton} btn d-flex align-items-center justify-content-center`}
              onClick={handleGetStartedBtnClick}
            >
              Get started <i className="fa fa-arrow-right" />
            </button>
            <Link
              href="https://drive.google.com/file/d/1F5ifIrmdH3DVlzzgDezaNuEI8X95qkE-/view"
              target="_blank"
              className={`${styles.secondaryButton} btn`}
            >
              Download brochure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ data }) => {
  return (
    <div className={styles.slidesContainer}>
      <CustomSlick slickWrapperClassName={styles.slickWrapper}>
        {data?.map((item, index) => (
          <HeroSectionSlide key={`hero-slide-${index}`} data={item} />
        ))}
      </CustomSlick>
    </div>
  );
};

export default HeroSection;
