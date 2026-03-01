import React, { useState } from "react";
import BreadcrumbSection from "../About/BreadcrumbSection";
import styles from "./CollegePredictor.module.scss";
import CommonTable from "../common/common-table";
import Image from "next/image";
import { rankPredictor } from "@/api";
import ToastMessage from "../common/Toasts";
import { IoMdArrowRoundForward } from "react-icons/io";

const tableData = {
  columns: [
    {
      name: "Marks",
    },
    {
      name: "Rank",
    },
  ],
  rows: [
    ["720", "1"],
    ["716", "3"],
    ["715", "4-19"],
    ["712", "20"],
    ["711", "21-26"],
    ["710", "27-50"],
    ["707-699", "32 -129"],
    ["698 - 688", "130-380"],
    ["687-679", "381 - 842"],
    ["678 - 668", "850 - 1698"],
    ["667-658", "1700 - 2945"],
    ["657-649", "3065 - 4869"],
    ["648-638", "5073 - 7357"],
    ["637-629", "7643 - 10545"],
    ["628-618", "10877 - 14353"],
    ["617- 609", "14766 - 18807"],
    ["600 -598", "19277 - 24533"],
  ],
};
const defaultState = {
  name: "",
  phone: "",
  gender: "",
  category: "",
  score: "",
  rank: "",
};

const CollegePredictorComponent = () => {
  const [formData, setFormData] = useState(defaultState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "score") {
      if (!!value && +value >= 1 && +value <= 720) {
        setFormData({ ...formData, [name]: value });
      }
      if (!value) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "rank") {
      if (!!value && +value >= 1 && +value <= 2300000) {
        setFormData({ ...formData, [name]: value });
      }
      if (!value) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await rankPredictor(formData);
      ToastMessage({
        type: "success",
        message:
          "Form submitted succesfully!, our team will connect with you shortly.",
      });
      setFormData({ ...defaultState });
    } catch (err) {
      ToastMessage({
        type: "error",
        message: "Oops something went wrong!",
      });
      setFormData({ ...defaultState });
      console.log("error", err);
    }
  };

  return (
    <div className={styles.collegePredictorSection}>
      <BreadcrumbSection
        imgURL="/assets/images/breadcrumbs/rank-predictor.webp"
        title="BAMS College Predictor 2025"
        subtitle="Forecast early to know which college to secure your BAMS seat."
      />

      <div className="container-lg py-5">
        <div className="row mb-5">
          <div className="col-md-7">
            <form onSubmit={handleSubmit} className="card py-3 px-4">
              <div className="form-group mb-3">
                <label htmlFor="name" className="mb-2">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phone" className="mb-2">
                  <strong>Mobile number</strong>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="9999999999"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="gender" className="mb-2">
                  <strong>Gender</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option selected>Choose your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="category" className="mb-2">
                  <strong>Category</strong>
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option selected>Choose your category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                  <option value="PWD">PWD</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="score" className="mb-2">
                  <strong>NEET UG Score</strong>
                </label>
                <input
                  type="number"
                  name="score"
                  id="score"
                  placeholder="1-720"
                  min={1}
                  max={720}
                  className="form-control"
                  value={formData.score}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="rank" className="mb-2">
                  <strong>NEET UG Rank</strong>
                </label>
                <input
                  type="number"
                  name="rank"
                  id="rank"
                  placeholder="1-2300000"
                  min={1}
                  max={2300000}
                  className="form-control"
                  value={formData.rank}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group text-center">
                <button className="btn btn-outline-success px-4">Submit</button>
              </div>
            </form>
          </div>
          <div className="col-md-5">
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
        </div>
        <div className={styles.content}>
          <div className="mb-4">
            <p>
              The NEET College Predictor 2025 is an useful tool designed to help
              BAMS aspirants predict their chances of admission into top private
              and private-public medical colleges in India based on their NEET
              scores.
            </p>
            <p>
              This predictor analyzes previous years’ NEET cutoff data for 548
              BAMS colleges to provide candidates with suitable college options.
              It uses opening and closing ranks from NEET counseling conducted
              by MCC for 15% AIQ seats and respective state authorities for 85%
              state quota seats.{" "}
            </p>
            <p>
              NEET 2025 exam is on 5th May 2025. NEET qualifying percentile is
              50 for General category and 40 for reserved categories. The
              expected NEET 2025 cutoff is 720-164 for General/EWS and 163-129
              for reserved categories. Only candidates meeting the qualifying
              cutoff will be eligible for counseling.
            </p>
            <p>
              After the NEET 2025 result, candidates can use the predictor and
              enter their scores to check expected college allotment. This will
              help them plan better for counseling by analyzing chances of
              getting into preferred private/private-public BAMS colleges based
              on previous years’ cutoff trends. The predictor will be updated
              with the latest NEET 2025 cutoff once released.
            </p>
          </div>
          <div className="mb-4">
            <div className={styles.title}>
              Estimate Your Rank with NEET College Predictor 2025
            </div>
            <div>
              <p>
                The NEET exam is the gateway to pursuing BAMS in India. Once the
                NEET result is announced, the next important step is predicting
                your rank based on your marks.
              </p>
              <p>
                Knowing your expected NEET rank can help you shortlist colleges
                and strategize for counseling. The rank will determine your
                chances of getting into preferred government and private medical
                colleges as per previous years' cutoff trends.
              </p>
              <p>
                Analyzing the latest NEET result data can give you an estimate
                of the rank you can expect corresponding to your marks. Given
                below is a NEET Marks vs Rank analysis to help you predict your
                rank range:
              </p>
              <CommonTable tableData={tableData} />
              <p>
                Use this NEET Marks vs Rank analysis as a reference to set
                realistic college expectations. An accurate rank estimate will
                be possible after the NEET result. Use the NEET College
                Predictor 2025 then to get your list of top BAMS colleges in
                India.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className={styles.title}>College veda facilities</div>
            <div>
              <div>
                <div>
                  <IoMdArrowRoundForward /> Seat locking facilities
                </div>
                <div>
                  <IoMdArrowRoundForward /> Counselling support
                </div>
                <div>
                  <IoMdArrowRoundForward /> Seat locking facilities
                </div>
                <div>
                  <IoMdArrowRoundForward /> Provide college information
                </div>
                <div>
                  <IoMdArrowRoundForward /> Reliable admission procedure
                </div>
                <div>
                  <IoMdArrowRoundForward /> Follow following steps for
                  confirming seat
                  <ol type="a">
                    <li>Planning</li>
                    <li>Cut-off analysis</li>
                    <li>Explore options</li>
                    <li>Hire on expert</li>
                    <li>Act and achieve</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <Image
            src="/assets/images/common/admission-process.avif"
            width="0"
            height="0"
            className="w-100 h-auto"
            sizes="100vw"
            alt="all india counselling chart"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CollegePredictorComponent;
