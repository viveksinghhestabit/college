import React from "react";
import styles from "./CounterSection.module.scss";

const CounterSection = () => {
  return (
    <section className={`${styles.counterSection} text-center`}>
      <div className={styles.heading}>
        Our Many years of Experience in Numbers
      </div>
      <div
        className={`${styles.counters} d-flex align-items-center justify-content-center`}
      >
        <div className={styles.counter}>
          <div className={styles.count}>500+</div>
          <div className={styles.subtitle}>Colleges</div>
        </div>
        <div className={styles.counter}>
          <div className={styles.count}>50+</div>
          <div className={styles.subtitle}>Counsellors</div>
        </div>
        <div className={styles.counter}>
          <div className={styles.count}>100%</div>
          <div className={styles.subtitle}>Satisfaction rate</div>
        </div>
        <div className={styles.counter}>
          <div className={styles.count}>11000+</div>
          <div className={styles.subtitle}>Happy students</div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
