import React, { useState } from "react";
import styles from "./ConsultationForm.module.scss";
import ToastMessage from "../Toasts";
import { submitEnquiry } from "@/api";
import Image from "next/image";

const defaultState = {
  joinAs: "Student",
  fullName: "",
  phone: "",
  email: "",
  message: "",
  source: "Book consultation button",
  firmName: "",
  institutionName: "",
  designation: "",
  courseDetails: "",
  exam: "",
};

const joinAsOptions = ["Consultant", "Institution", "Student"];

const ConsultationForm = ({
  handleClose,
  source = "Book consultation button",
  showOptions = true,
}) => {
  const [formData, setFormData] = useState({ ...defaultState, source });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitEnquiry(formData);
      ToastMessage({
        type: "success",
        message:
          "Contact form submitted succesfully!, our team will connect with you shortly.",
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
            <form action="#" onSubmit={handleSubmit}>
              {showOptions && (
                <div className="form-group mb-4">
                  <label htmlFor="" className="mb-2">
                    <strong>Join as</strong>
                  </label>
                  <div className="d-flex align-items-center justify-content-between">
                    {joinAsOptions.map((item, index) => (
                      <div key={`join-as-option-${index}`} class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="joinAs"
                          id={`radio-button-${index}`}
                          value={item}
                          onChange={handleChange}
                          checked={item === formData?.joinAs}
                        />
                        <label
                          class="form-check-label"
                          for={`radio-button-${index}`}
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {formData?.joinAs === "Student" && (
                <>
                  <div className="form-group mb-4">
                    <input
                      type="name"
                      className={`form-control ${styles.formControl}`}
                      id="name"
                      placeholder="Name"
                      required
                      name="fullName"
                      onChange={handleChange}
                      value={formData.fullName}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <div className="pe-3">
                      <div className="input-group-prepend">
                        <div
                          className={`input-group-text ${styles.formControl}`}
                        >
                          +91
                        </div>
                      </div>
                    </div>
                    <input
                      type="tel"
                      className={`form-control ${styles.formControl}`}
                      id="mobile"
                      placeholder="Mobile"
                      required
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="email"
                      className={`form-control ${styles.formControl}`}
                      id="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className={`form-control ${styles.formControl}`}
                      id="course-details"
                      placeholder="Course details"
                      name="courseDetails"
                      onChange={handleChange}
                      value={formData.courseDetails}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className={`form-control ${styles.formControl}`}
                      id="appearing exam"
                      placeholder="Appearing exam"
                      name="exam"
                      onChange={handleChange}
                      value={formData.exam}
                    />
                  </div>
                </>
              )}
              {formData.joinAs === "Institution" && (
                <>
                  <div className="form-group mb-4">
                    <input
                      type="name"
                      className={`form-control ${styles.formControl}`}
                      id="name"
                      placeholder="Name"
                      required
                      name="fullName"
                      onChange={handleChange}
                      value={formData.fullName}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="institutionName"
                      className={`form-control ${styles.formControl}`}
                      id="institutionName"
                      placeholder="Institution name"
                      name="institutionName"
                      onChange={handleChange}
                      value={formData.institutionName}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="designation"
                      className={`form-control ${styles.formControl}`}
                      id="designation"
                      placeholder="Designation"
                      name="designation"
                      onChange={handleChange}
                      value={formData.designation}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <div className="pe-3">
                      <div className="input-group-prepend">
                        <div
                          className={`input-group-text ${styles.formControl}`}
                        >
                          +91
                        </div>
                      </div>
                    </div>
                    <input
                      type="tel"
                      className={`form-control ${styles.formControl}`}
                      id="mobile"
                      placeholder="Mobile"
                      required
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                </>
              )}
              {formData.joinAs === "Consultant" && (
                <>
                  <div className="form-group mb-4">
                    <input
                      type="name"
                      className={`form-control ${styles.formControl}`}
                      id="name"
                      placeholder="Name"
                      required
                      name="fullName"
                      onChange={handleChange}
                      value={formData.fullName}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <div className="pe-3">
                      <div className="input-group-prepend">
                        <div
                          className={`input-group-text ${styles.formControl}`}
                        >
                          +91
                        </div>
                      </div>
                    </div>
                    <input
                      type="tel"
                      className={`form-control ${styles.formControl}`}
                      id="mobile"
                      placeholder="Mobile"
                      required
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="firmName"
                      className={`form-control ${styles.formControl}`}
                      id="firmName"
                      placeholder="Firm name"
                      name="firmName"
                      onChange={handleChange}
                      value={formData.firmName}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <textarea
                      className={`form-control ${styles.formControl}`}
                      id="interest"
                      placeholder="Why?"
                      rows={3}
                      name="message"
                      onChange={handleChange}
                      value={formData.message}
                    />
                  </div>
                </>
              )}
              <div className="form-group mb-4">
                <button className={`${styles.submitButton} btn btn-block`}>
                  Register Now
                </button>
              </div>
              <div className={`${styles.infoText} text-center`}>
                By proceeding, you explicitly consent to the Terms & Conditions
                and Privacy Policy of CollegeVeda.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
