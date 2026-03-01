import React, { useEffect, useState } from "react";
import styles from "./ExploreSection.module.scss";
import CustomSlick from "@/components/common/CustomSlick";
import Image from "next/image";
import Link from "next/link";
import { getStates } from "@/api";
import Loader from "@/components/common/Loader";

const slickSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  swipeToSlide: true,
  gap: 40,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2.25,
      },
    },
  ],
};

const ExploreStatesCard = ({ data }) => {
  return (
    <div
      className={`${styles.exportStateCard} d-flex flex-column align-items-center justify-content-center`}
    >
      <div className={styles.img}>
        <Image
          src={data?.coverImage}
          width="0"
          height="0"
          className="w-100 h-auto"
          sizes="100vw"
          alt="brand-logo"
          draggable={false}
        />
      </div>
      <div className={styles.title}>{data?.name}</div>
      <Link
        href={`/colleges?state=${data.name}`}
        className={`${styles.exploreBtn} btn`}
      >
        Explore College <i className="fa fa-arrow-right ms-1" />
      </Link>
    </div>
  );
};

const ExploreSection = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStates = async () => {
    try {
      const res = await getStates();
      setStates(res?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStates();
  }, []);

  return (
    <section>
      <div className="container-lg py-sm-5 my-5">
        <div className={styles.exploreSection}>
          <div className="section-title mb-2">Explore States</div>
          <div className="section-subtitle">
            Each region presents a unique blend of academic excellence, cultural
            heritage, and specialized learning environments.
          </div>
          <div className={`${styles.collegesList} mt-4`}>
            {loading ? (
              <Loader />
            ) : (
              <CustomSlick overrideConfiguration={{ ...slickSettings }}>
                {states?.slice(0, 5)?.map((item, index) => (
                  <ExploreStatesCard
                    data={item}
                    key={`testimonial-card-${index}`}
                  />
                ))}
              </CustomSlick>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
