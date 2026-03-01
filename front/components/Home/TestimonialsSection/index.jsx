import React, { useEffect, useState } from "react";
import styles from "./TestimonialsSection.module.scss";
import CustomSlick from "@/components/common/CustomSlick";
import Image from "next/image";
import { getTestimonials } from "@/api";
import Loader from "@/components/common/Loader";

const slickSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  swipeToSlide: true,
  gap: 40,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const TestimonialCard = ({ data }) => {
  return (
    <div className={`${styles.testimonialImg} px-sm-4 py-4 h-100`}>
      <div className={`${styles.testimonialCard} text-center`}>
        <div className={styles.testimonialImg}>
          <Image
            src={data?.photo}
            width="0"
            height="0"
            className="w-100 h-auto"
            sizes="100vw"
            alt="brand-logo"
            draggable={false}
          />
        </div>
        <div className={styles.description}>{data?.message}</div>
        <div className={styles.name}>{data?.name}</div>
        <div className={styles.title}>{data?.position}</div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await getTestimonials();
      setTestimonials(res?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTestimonials();
  }, []);

  return (
    <section>
      <div className="container-lg py-sm-5 my-5">
        <div className={styles.testimonialsSection}>
          <div className="section-title mb-2">What Our Students Says?</div>
          <div className="section-subtitle">
            At College Veda, our commitment to excellence is reflected in the
            success stories of our Students.
          </div>
          <div className={`${styles.testimonialsList} mt-sm-5`}>
            {loading ? (
              <Loader />
            ) : (
              <CustomSlick overrideConfiguration={{ ...slickSettings }}>
                {testimonials?.map((item, index) => (
                  <TestimonialCard
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

export default TestimonialsSection;
