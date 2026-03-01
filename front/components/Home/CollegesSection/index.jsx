import React, { useEffect, useState } from "react";
import styles from "./CollegesSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getColleges } from "@/api";
import { GetFirstParaFromRichText } from "@/utils/helper";
import Loader from "@/components/common/Loader";
import Modal from "react-responsive-modal";
import ApplyForm from "@/components/common/ApplyForm";

const CollegesSection = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeOfCollege, setTypeOfCollege] = useState("all");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleApply = (name) => {
    onOpenModal();
  };

  const fetchColleges = async () => {
    try {
      const res = await getColleges();
      setColleges(res?.data?.data);
      setLoading(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchColleges();
  }, []);

  useEffect(() => {
    if (typeOfCollege === "all") {
      setFilteredColleges([...colleges]);
    } else {
      setFilteredColleges([
        ...colleges.filter((item) => item?.collegeType === typeOfCollege),
      ]);
    }
  }, [typeOfCollege, colleges]);

  const handleChange = (e) => {
    const value = e.target.getAttribute("data-value");
    setTypeOfCollege(value);
  };

  return (
    <>
      <div className={styles.collegesSection}>
        <div className="container-lg py-5">
          <div className="row align-items-center">
            <div className="col-sm-7">
              <div className={styles.title}>
                Discover India's Premier BAMS Colleges
              </div>
              <div className={styles.subtitle}>
                Explore a curated selection of India's most prestigious Bachelor
                of Ayurvedic Medicine and Surgery (BAMS) colleges handpicked by
                College Veda. These institutions stand at the forefront of
                holistic education and are renowned for their excellence in
                Ayurvedic studies.
              </div>
            </div>
            <div className={`${styles.toggleButton} col-sm-5`}>
              <button
                data-value="all"
                className={`${
                  typeOfCollege === "all" ? styles.selected : ""
                } btn `}
                type="button"
                onClick={handleChange}
              >
                All
              </button>
              <button
                data-value="Private"
                className={`${
                  typeOfCollege === "Private" ? styles.selected : ""
                } btn `}
                type="button"
                onClick={handleChange}
              >
                Private colleges
              </button>
              <button
                data-value="Government"
                className={`${
                  typeOfCollege === "Government" ? styles.selected : ""
                } btn `}
                type="button"
                onClick={handleChange}
              >
                Government colleges
              </button>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className={`${styles.collegesList} row`}>
              {filteredColleges?.slice(0, 9)?.map((item, index) => (
                <div
                  key={`college-card-${index}`}
                  className="col-lg-4 col-md-6 mb-4"
                >
                  <div className={styles.collegeCard}>
                    <Image
                      src={item?.coverpic}
                      width="0"
                      height="0"
                      className={`${styles.collegeImage} w-100`}
                      sizes="100vw"
                      alt="brand-logo"
                      draggable={false}
                    />
                    <div
                      className={`${styles.collegeCardContent} p-4 d-flex align-items-start flex-column justify-content-between`}
                    >
                      <div>
                        <div className="d-flex align-items-center justify-content-start">
                          <span className={styles.tag}>BAMS</span>
                          <div
                            className={`${styles.collegeType} d-flex align-items-center justify-content-center`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                              className="me-1"
                            >
                              <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>
                            {item?.collegeType} College
                          </div>
                          <div
                            className={`${styles.reviews} ms-auto d-flex align-items-center flex-column justify-content-center`}
                          >
                            Rating
                            <div
                              className={`${styles.ratings} d-flex align-items-center justify-content-start`}
                            >
                              {[1, 2, 3, 4].map((index) => (
                                <i
                                  className="fas fa-star"
                                  key={`start-${index}`}
                                />
                              ))}
                              <i className="far fa-star" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.title}>{item?.fullName}</div>
                        <div className={styles.description}>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: GetFirstParaFromRichText(
                                item?.description
                              )?.substring(0, 145),
                            }}
                          ></span>
                          {GetFirstParaFromRichText(item?.description)?.length >
                            145 && <>...</>}
                        </div>
                      </div>
                      <div
                        className={`${styles.buttonsContainer} d-flex align-items-center justify-content-start mt-3`}
                      >
                        <Link
                          href={`/colleges/${item?.slug || item?._id}`}
                          className={`${styles.primaryButton} btn`}
                        >
                          Read more
                        </Link>
                        <button
                          onClick={() => {
                            handleApply(item?.fullName);
                          }}
                          className={`${styles.secondaryButton} btn`}
                        >
                          Apply now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex align-items-center justify-content-center mt-sm-4">
            <Link
              href="/colleges"
              type="button"
              className={`${styles.exploreButton} btn`}
            >
              Explore all colleges
            </Link>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={onCloseModal}
        styles={{
          modal: {
            maxWidth: "1100px",
            width: "90%",
            padding: "unset",
            borderRadius: "8px",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          closeButton: {
            background: "transparent",
          },
        }}
        center
      >
        <ApplyForm handleClose={onCloseModal} />
      </Modal>
    </>
  );
};

export default CollegesSection;
