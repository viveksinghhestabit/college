import React from "react";
import BreadcrumbSection from "../About/BreadcrumbSection";
import styles from "./AllIndiaCounselling.module.scss";
import Image from "next/image";
import Link from "next/link";
import CommonTable from "../common/common-table";

const AllIndiaCounsellingComponent = () => {
  const categoryWiseTable = {
    tableName: "Students Appeared for NEET 2025 Category wise",
    columns: [
      {
        name: "Category",
      },
      {
        name: "Numbers",
      },
      {
        name: "% of Total Registrations",
      },
    ],
    rows: [
      ["Total Registrations", "24,06,079", "100%"],
      ["Male Candidates", "9,98,298", "43.0%"],
      ["Female Candidates", "13,34,982", "57.50"],
      ["SC", "3,44,327", "14.70%"],
      ["ST", "1,50,181", "6.40%"],
      ["Third Gender", "17", ".001%"],
      ["General", "6,25,477", "27.5%"],
      ["OBC", "10,26,388", "43.10%"],
      ["Gen-EWS", "1,86,924", "8.0%"],
    ],
  };

  const analysisTable = {
    tableName: "Analysis of Students Appeared for NEET 2025 Exam",
    columns: [
      {
        name: "Year",
      },
      {
        name: "Total Registrations",
      },
    ],
    rows: [
      ["2025", "23,33,297"],
      ["2023", "20,87,445"],
      ["2022", "18,72,343"],
      ["2021", "16,14,777"],
      ["2020", "15,97,435"],
    ],
  };

  const resultsTable = {
    tableName: "NEET 2025 Results Statistics",
    columns: [
      {
        name: "Category",
      },
      {
        name: "Registered 2025",
      },
      {
        name: "Appeared 2025",
      },
      {
        name: "Qualified",
      },
    ],
    rows: [
      ["OBC", "10,54,277", "10,26,388", "6,18,890"],
      ["SC", "3,56,727", "3,44,327", "1,78,738"],
      ["ST", "1,57,115", "1,50,181", "68,479"],
      ["General", "6,25,477", "6,25,477", "3,33,932"],
      ["EWS", "1,90,700", "1,86,924", "1,16,229"],
      ["Total", "24,06,079", "23,33,297", "13,16,268"],
    ],
  };

  return (
    <div className={styles.cutoffSection}>
      <BreadcrumbSection
        imgURL="/assets/images/breadcrumbs/rank-predictor.webp"
        title="All India Counselling"
      />
      <div className="container-lg py-5">
        <div className={styles.content}>
          <div className="mb-4">
            <h1 className={styles.title}>
              Online Counseling for Allotment of All India Quota(AIQ)-Under
              Graduate (BAMS) Seats
            </h1>
            <p>
              All the eligible candidates who qualified in NEET(UG)-2025
              examination and aspiring for admission in Under Graduate
              (BAMS/BSMS/BUMS/BHMS) courses are hereby informed that Counselling
              for All India Quota seats under Government, Government Aided,
              Deemed Universities, Central Universities, and National Institutes
              for the session 2025-25 will be conducted by Ayush Admissions
              Central Counseling Committee (AACCC), Ministry of Ayush,
              Government of India.
            </p>
            <ol type="1">
              <li>
                For participation in AACCC-UG Counseling, the candidates are
                required to register themselves at the official website of AACCC{" "}
                <Link href="https://aaccc.gov.in/" target="_blank">
                  (www.aaccc.gov.in)
                </Link>
                . 2. Kindly note that Non-Refundable registration fees and
                Refundable Security deposits have to be paid by the candidates
                at the time of registration as per their category.
              </li>
              <li>
                Kindly note that Non-Refundable registration fees and Refundable
                Security deposits have to be paid by the candidates at the time
                of registration as per their category.
              </li>
              <li>
                The Refundable Security Deposit will be forfeited if a candidate
                resigned from the seat/institute allotted during the 2nd Round.
                Further, the Refundable Security Deposit will be forfeited, if
                the candidate does not join/exit the allotted seats in Round-3
                or Stray Vacancy Round.
              </li>
            </ol>
            <Image
              src="/assets/images/common/allIndiaCounselling.webp"
              width="0"
              height="0"
              className="w-100 h-auto"
              sizes="100vw"
              alt="all india counselling chart"
              draggable={false}
            />
          </div>
          <div className="mb-4">
            <h3 className={styles.title}>
              Students Appeared for NEET 2025 Category wise
            </h3>
            <p>
              In the NEET 2025 examination, a total of 24 lakh students have
              registered. Among them, 42.80% are male candidates, accounting for
              10 Lakh+ registrations, while female candidates make up 57.20%
              with 13,63,216 registrations. There are 24 registrations from the
              third gender category.
            </p>

            <CommonTable tableData={categoryWiseTable} />
          </div>
          <div className="mb-4">
            <h3 className={styles.title}>
              Analysis of Students Appeared for NEET 2025 Exam
            </h3>
            <p>
              The number of students who took the NEET exam in a given year is
              shown in the table below. Note that the relevant authorities have
              not formally related to NEET 2025 statistics. The figure provided
              for NEET 2025 represents a tentative analysis.
            </p>
            <CommonTable tableData={analysisTable} />
          </div>
          <div>
            <CommonTable tableData={resultsTable} />
          </div>
          <div className="mb-4">
            <h1 className={styles.title}>
              NEET Counselling 2025 Documents Required
            </h1>
            <p>
              To participate in NEET Counselling 2025, candidates need to
              provide the following documents:
            </p>
            <ol type="1">
              <li>NEET Admit Card</li>
              <li>NEET Scorecard or Rank letter</li>
              <li>
                Class 10 Certificate and Mark Sheet (for date of birth of birth
                verification)
              </li>
              <li>Class 12 Certificate and Mark Sheet</li>
              <li>ID Proof (Aadhar/PAN Card/Driving License/Passport)</li>
              <li>Eight Passport Size Photographs</li>
              <li>Provisional Allotment Letter</li>
              <li>Caste Certificate (if applicable)</li>
              <li>PwD Certificate (if applicable)</li>
            </ol>
          </div>
          <div className="mb-4">
            <h1 className={styles.title}>
              Additional Documents for NRI/OCI Candidates Appearing for Deemed
              Universities:
            </h1>
            <ol type="1">
              <li>Passport Copy of Sponsor</li>
              <li>Embassy Certificate</li>
              <li>
                Sponsorship Affidavit (indicating the sponsor's commitment to
                covering all expenses for the duration of the study)
              </li>
              <li>
                Relationship Affidavit (specifying the relationship between the
                candidate and the sponsor)
              </li>
            </ol>
            <p>
              These documents are necessary for the verification process and to
              ensure eligibility for the counselling and subsequent admission
              process.
            </p>
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

export default AllIndiaCounsellingComponent;
