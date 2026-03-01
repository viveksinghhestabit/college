import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "react-phone-number-input/style.css";
import "../../../styles/AddArtistForm.css";
import AlertTitle from "@mui/material/AlertTitle";
import LoadingPage from "../../utils/LoadingPage";
import {
  addCourses,
  getCollegeById,
  getUniversity,
  postColleges,
} from "../../../redux/api";
import LoadingComponent from "../../utils/LoadingButton";

const initialState = {
  name: "",
  fee: "",
  specialization: "",
};

const AddCourse = () => {
  const [universityData, setuniversityData] = useState(initialState);
  const [countryState, setcountryState] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingButton, setloadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name } = e.target;
    setuniversityData({ ...universityData, [name]: e.target.value });
  };

  const { id } = useParams();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setloadingButton(true);
      const payload = {
        ...universityData,
        collegeid: id,
      };
      await addCourses(payload);
      setloadingButton(false);
      history.push(`/colleges/${id}/course`);
    } catch (err) {
      setloadingButton(false);
    }
  };

  return (
    <div className="addArtist-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          {page === 1 && (
            <div className="addArtist-personalDetails">
              {/* first row */}
              <form
                onSubmit={handlesubmit}
                method="POST"
                enctype="multipart/form-data"
              >
                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">
                      Select a Course{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>
                    </label>

                    <select
                      className="addArtist-selectField"
                      name="name"
                      required
                      // id={universityData?.state?.length ? "" : "red-border"}
                      placeholder="Select A State"
                      value={universityData?.name}
                      onChange={handleChange}
                    >
                      <option value=""> Please Select A Course</option>
                      <option value="BAMS">BAMS</option>
                    </select>
                  </div>

                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">
                      Fees{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>{" "}
                    </label>
                    <input
                      type="text"
                      required
                      name="fee"
                      value={universityData?.fee}
                      onChange={handleChange}
                      placeholder="Fees"
                      className={`${"addArtist-inputField"} `}
                    />
                  </div>
                  {/* <button className=''>Upload</button> */}
                </div>
                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">
                      Specializtion{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}></span>{" "}
                    </label>
                    <input
                      type="text"
                      required
                      name="specialization"
                      value={universityData?.specialization}
                      onChange={handleChange}
                      placeholder="Specialization"
                      className={`${"addArtist-inputField"} `}
                    />
                  </div>
                </div>
                <div className="addArtist-submitDetailDiv">
                  <button
                    className="addArtist-submitDetailBtn"
                    onClick={handlesubmit}
                  >
                    Add Courses {loadingButton ? <LoadingComponent /> : null}
                  </button>
                </div>
              </form>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default AddCourse;
