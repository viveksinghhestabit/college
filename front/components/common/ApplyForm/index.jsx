import React, { useState } from "react";
import styles from "./ApplyForm.module.scss";
import ToastMessage from "../Toasts";
import { applyForm } from "@/api";
import Image from "next/image";

const categoriesOption = ["General", "OBC", "SC", "ST", "EWS", "PWD"];
const defaultState = {
  name: "",
  score: "",
  category: "",
  rank: "",
  contact: "",
  courseInteresed: "",
};

const ApplyForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({ ...defaultState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await applyForm(formData);
      ToastMessage({
        type: "success",
        message:
          "Form submitted succesfully!, our team will connect with you shortly.",
      });
      setFormData({ ...defaultState });
      handleClose();
    } catch (err) {
      ToastMessage({
        type: "error",
        message: "Oops something went wrong!",
      });
      setFormData({ ...defaultState });
      handleClose();
      console.log("error", err);
    }
  };

  return (
    <div className={styles.connectModal}>
      <div className="row">
        <div className="col-md-6 pe-0">
          <Image
            src="/assets/images/common/contact-modal.webp"
            width="0"
            height="0"
            className={`${styles.leftImg} w-100 h-auto`}
            sizes="100vw"
            alt="about img"
            draggable={false}
          />
        </div>
        <div className="col-md-6 h-100 ps-md-0">
          <div
            className={`${styles.rightPart} p-4 my-4 mx-md-4 d-flex align-items-center justify-content-between`}
          >
            <form action="#" className="w-100" onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="name"
                  placeholder="Name"
                  required
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="number"
                  className={`form-control ${styles.formControl}`}
                  id="score"
                  placeholder="NEET score"
                  required
                  name="score"
                  onChange={handleChange}
                  value={formData.score}
                  min={1}
                  max={720}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="number"
                  className={`form-control ${styles.formControl}`}
                  id="rank"
                  placeholder="Rank"
                  required
                  name="rank"
                  onChange={handleChange}
                  value={formData.rank}
                  min={1}
                  max={100000}
                />
              </div>
              <div className="input-group mb-4">
                <div className="pe-3">
                  <div className="input-group-prepend">
                    <div className={`input-group-text ${styles.formControl}`}>
                      +91
                    </div>
                  </div>
                </div>
                <input
                  type="tel"
                  className={`form-control ${styles.formControl}`}
                  id="contact"
                  placeholder="Mobile"
                  required
                  name="contact"
                  onChange={handleChange}
                  value={formData.contact}
                  maxLength={10}
                />
              </div>
              <div className="form-group mb-3">
                <select
                  class={`form-select ${styles.formControl}`}
                  aria-label="Default select example"
                  id="category"
                  name="category"
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose your category</option>
                  {categoriesOption?.map((item, index) => (
                    <option key={`option-${index}`} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="courseInteresed"
                  placeholder="Course interested?"
                  required
                  name="courseInteresed"
                  onChange={handleChange}
                  value={formData.courseInteresed}
                />
              </div>
              <div className="form-group mb-4">
                <button className={`${styles.submitButton} btn btn-block`}>
                  Apply now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
