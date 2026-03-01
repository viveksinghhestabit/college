import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../styles/AddEmployeeForm.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { uploadImage } from "../../utils/uploadHelper";
import {
  getShowcaseImageById,
  postShowCaseImage,
  updateShowcaseImages,
  updateShowcaseTable,
  updateStates,
} from "../../redux/api";
import LoadingPage from "../utils/LoadingPage";
import LoadingComponent from "../utils/LoadingButton";

const initialData = {
  title: "",
  subtitle: "",
  image: "",
};

const AddShowcaseForm = () => {
  const { id } = useParams();

  const [showcaseData, setShowcaseData] = useState(initialData);
  const [loadingUi, setLoadingUi] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    stateById();
  }, []);

  const handleChange = (e) => {
    const { name } = e.target;
    setShowcaseData({ ...showcaseData, [name]: e.target.value });
  };

  const handleinput2 = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      const result = await uploadImage(file, "showcase-image");
      setShowcaseData({ ...showcaseData, image: result.url });
    } catch (error) {
      alert(error.message || "Upload failed");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      await postShowCaseImage(showcaseData);
      history.push("/home-showcase");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };

  const stateById = async () => {
    if (!!id) {
      try {
        setLoadingUi(true);
        const response = await getShowcaseImageById(id);
        setShowcaseData(response?.data?.data);
        setLoadingUi(false);
      } catch (error) {
        setLoadingUi(false);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      setLoadingButton(true);
      await updateShowcaseImages(showcaseData);
      history.push("/home-showcase");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };
  return (
    <div className="addEmployee-container">
      {loadingUi ? (
        <LoadingPage />
      ) : (
        <div className="addEmployee-personalDetails">
          <div className="addEmployee-alignRow">
            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel">
                Title{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <input
                type="text"
                name="title"
                placeholder="Show case title"
                defaultValue={showcaseData.title}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addEmployee-alignRow">
            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel">
                Subtitle{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <input
                type="text"
                name="subtitle"
                placeholder="Show case sub-title"
                defaultValue={showcaseData.subtitle}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addEmployee-alignRow">
            <div className="addEmployee-inputFieldDiv w-100">
              <label className="addEmployee-inputLabel">State Pic</label>
              <input
                type="file"
                name="coverImage"
                placeholder="State Pic"
                className="addEmployee-inputField"
                onChange={handleinput2}
              />
            </div>
          </div>
          {!!showcaseData?.image && (
            <img
              src={showcaseData?.image}
              height={100}
              className="mt-3"
              width={100}
              alt="blog-pic"
            />
          )}
          <div className="addEmployee-submitDetailDiv">
            {!!id ? (
              <button
                className="addEmployee-submitDetailBtn"
                onClick={handleUpdate}
              >
                Update
                {LoadingButton && <LoadingComponent />}
              </button>
            ) : (
              <button
                className="addEmployee-submitDetailBtn"
                onClick={handlesubmit}
              >
                Submit
                {LoadingButton && <LoadingComponent />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddShowcaseForm;
