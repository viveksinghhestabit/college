import React from "react";
import styles from "./WhoSection.module.scss";
import Link from "next/link";
import Image from "next/image";

const WhoSection = () => {
  return (
    <div className={styles.whoSection}>
      <div className="container-lg pt-sm-5 mt-5">
        <div className="row">
          <div className="col-sm-5 order-sm-1 order-2 mt-sm-0 mt-4">
            <Image
              src="/assets/images/common/college-image.avif"
              width="0"
              height="0"
              className="w-100 h-100"
              sizes="100vw"
              alt="brand-logo"
              draggable={false}
            />
          </div>
          <div className="col-sm-7 order-sm-2 order-1 p-sm-5">
            <div className={styles.content}>
              <span>WHO WE ARE</span>
              <div className={styles.title}>
                We're the Ayurveda experts, unlocking ancient wisdom to make it
                simple and cool.
              </div>
              <div className={styles.desc}></div>
              <div className={styles.list}>
                <div className={styles.listItem}>
                  <span className={styles.iconContainer}>
                    <i className="fa fa-check" />
                  </span>
                  For Students: If you're a student, we've got your back! We
                  help you figure out Ayurveda studies in an easy way.
                </div>
                <div className={styles.listItem}>
                  <span className={styles.iconContainer}>
                    <i className="fa fa-check" />
                  </span>
                  For Institutions: If you're a school or college, we're here to
                  make things smoother for you. Let's team up for success!
                </div>
                <div className={styles.listItem}>
                  <span className={styles.iconContainer}>
                    <i className="fa fa-check" />
                  </span>
                  For Parents: We're your allies in this Ayurveda journey. We've
                  got the info you need to guide your awesome kids.
                </div>
              </div>
              <Link href="/colleges" className={`${styles.button} btn`}>
                Explore colleges <i className="fa fa-arrow-right ms-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoSection;
