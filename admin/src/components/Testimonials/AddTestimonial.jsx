import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../styles/AddEmployeeForm.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import {
  postTestimonial,
  getTestimonialById,
  updateTestimonial,
} from "../../redux/api";
import LoadingPage from "../utils/LoadingPage";
import LoadingComponent from "../utils/LoadingButton";

const initialData = {
  name: "",
  position: "",
  photo: "",
  message: "",
};

const AddTestimonial = () => {
  const { id } = useParams();

  const [testimonialData, settestimonialData] = useState(initialData);
  const [LoadingUi, setLoadingUi] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name } = e.target;
    settestimonialData({ ...testimonialData, [name]: e.target.value });
  };

  const handleinput2 = async (e) => {
    try {
      const formdata = new FormData();
      formdata.append("file", e.target.files[0]);
      formdata.append("upload_preset", "eduvisor");
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/sinox-technology/image/upload`,
        formdata
      );
      settestimonialData({ ...testimonialData, photo: response?.data?.url });
    } catch (error) {
      alert(error);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      await postTestimonial(testimonialData);
      history.push("/testimonial");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    blogById();
  }, []);

  const blogById = async () => {
    if (!!id) {
      try {
        setLoadingUi(true);
        const response = await getTestimonialById(id);
        settestimonialData(response?.data?.data);
        setLoadingUi(false);
      } catch (error) {
        setLoadingUi(false);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      setLoadingButton(true);
      await updateTestimonial(testimonialData);
      history.push("/testimonial");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };
  return (
    <div className="addEmployee-container">
      {LoadingUi ? (
        <LoadingPage />
      ) : (
        <div className="addEmployee-personalDetails">
          <div className="addEmployee-alignRow">
            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel">
                Name <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={testimonialData?.name}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel">
                Position{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={testimonialData?.position}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addEmployee-alignRow">
            <div className="addEmployee-inputFieldDiv w-100">
              <label className="addEmployee-inputLabel">
                Photo{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <input
                type="file"
                name="photo"
                placeholder="Blog Pic"
                className="addEmployee-inputField"
                onChange={handleinput2}
              />
            </div>
          </div>
          {!!testimonialData?.photo && (
            <img
              src={testimonialData?.photo}
              height={100}
              className="mt-3"
              width={100}
              alt="blog-pic"
            />
          )}

          <div className="addEmployee-alignRow">
            <div style={{ marginTop: "20px", width: "100%" }}>
              <label className="addEmployee-inputLabel">
                Message{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <textarea
                name="message"
                placeholder="Message"
                value={testimonialData?.message}
                className="addEmployee-inputField"
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

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

export default AddTestimonial;
