import React from "react";
import styles from "./MissionSection.module.scss";
import Image from "next/image";

const data = [
  {
    id: "mission",
    imgUrl: "/assets/images/about/mission.webp",
    title: "Our Mission",
    description:
      "Our mission is to empower students by offering tailored guidance, resources, and unwavering support, ensuring they navigate the complexities of the education landscape with clarity and confidence.",
  },
  {
    id: "vision",
    imgUrl: "/assets/images/about/vision.webp",
    title: "Our Vision",
    description:
      "We aim to continue expanding our reach, innovating our services, and impacting the educational landscape positively, ensuring that each student's aspirations find a clear and achievable path to realization.",
  },
];

const MissionSection = () => {
  return (
    <section className={styles.missionSection}>
      <div className="container-lg mb-5">
        <div className="row">
          {data.map((item) => (
            <div className="col-sm-6 mb-sm-0 mb-4" key={`${item.id}-card`}>
              <div className={`${styles.missionCard} text-center`}>
                <div className={styles.img}>
                  <Image
                    src={item.imgUrl}
                    width="0"
                    height="0"
                    className="w-100 h-auto"
                    sizes="100vw"
                    alt="brand-logo"
                    draggable={false}
                  />
                </div>
                <div className={`${styles.title} mt-2`}>{item.title}</div>
                <div className={styles.desc}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
