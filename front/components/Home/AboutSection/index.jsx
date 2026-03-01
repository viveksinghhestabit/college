import React from "react";
import styles from "./AboutSection.module.scss";
import Image from "next/image";

const infoContent = [
  {
    icon: "/assets/images/home/about/about-icon-1.svg",
    title: "50+",
    subtitle: "counsellors",
  },
  {
    icon: "/assets/images/home/about/about-icon-2.svg",
    title: "100%",
    subtitle: "Satisfaction rate",
  },
  {
    icon: "/assets/images/home/about/about-icon-3.svg",
    title: "11000+",
    subtitle: "happy students",
  },
];

const AboutSection = () => {
  return (
    <section>
      <div className="container-lg mt-5 pt-md-5">
        <div className={styles.aboutSection}>
          <div className="row align-items-center">
            <div className="col-sm-5 order-sm-1 order-2">
              <Image
                src="/assets/images/home/about/about-img.webp"
                width="0"
                height="0"
                className={`${styles.aboutImg} w-100 h-auto`}
                sizes="100vw"
                alt="about img"
                draggable={false}
              />
            </div>
            <div
              className={`${styles.aboutContent} col-sm-7  order-sm-2 order-1`}
            >
              <span className="text-uppercase">More about us</span>
              <div className={`${styles.title} mb-3`}>
                Unlocking Your Potential in Ayurvedic Medicine
              </div>
              <div className={styles.subtitle}>
                At College Veda, we're like your guides to a career in Ayurveda,
                an ancient and natural way of keeping people healthy. We
                specialize in helping you get into Ayurvedic colleges, making
                the process smooth and accessible. We believe in the power of
                Ayurveda to bring well-being, and our mission is to support you
                in starting a meaningful career in this ancient and trusted
                field. Choose College Veda for a simple and supported pathway to
                a fulfilling Ayurvedic profession.
              </div>
              <div className={`${styles.infoContainer} row`}>
                {infoContent.map((item, index) => (
                  <div
                    key={`info-container-${index}`}
                    className={`${styles.info} col-4`}
                  >
                    <div className="row align-items-center">
                      <div className="col-sm-4">
                        <Image
                          src={item.icon}
                          width="0"
                          height="0"
                          className={`${styles.infoImg} w-100 h-auto`}
                          sizes="100vw"
                          alt="about img"
                          draggable={false}
                        />
                      </div>
                      <div className="col-sm-8">
                        <div className={styles.infoTitle}>{item.title}</div>
                        <div
                          className={`${styles.infoSubtitle} text-uppercase`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
