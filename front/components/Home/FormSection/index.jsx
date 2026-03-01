import React from "react";
import styles from "./FormSection.module.scss";

const FormSection = () => {
  return (
    <section>
      <div className={styles.formSection}>
        <div className="container-lg py-sm-5">
          <div className="row py-5">
            <div className="col-md-6">
              <div
                className={`${styles.content} d-flex align-items-start justify-content-center flex-column h-100`}
              >
                <div className={styles.title}>
                  Your <span>Ayurvedic journey</span> starts from here:
                </div>
                <div className={styles.subtitle}>
                  We're here to assist you in your journey towards BAMS
                  admissions. Kindly fill out the following details to help us
                  tailor our guidance specifically to your needs.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <form action="/" className={`${styles.form} p-sm-5 p-4`}>
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Your phone"
                  />
                </div>
                <button className="btn" type="submit">
                  Join now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
