import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../styles/AddEmployeeForm.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PostGallaryImage,
  getBlogById,
  postBlog,
  updateBlogs,
} from "../../redux/api";
import { uploadImage } from "../../utils/uploadHelper";
import LoadingPage from "../utils/LoadingPage";
import LoadingComponent from "../utils/LoadingButton";

const initialData = {
  sequence: "",
  image: "",
};

const AddGallary = () => {
  const { id } = useParams();

  const [GallaryData, setGallaryData] = useState(initialData);
  const [LoadingUi, setLoadingUi] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name } = e.target;
    setGallaryData({ ...GallaryData, [name]: e.target.value });
  };

  const handleinput2 = async (file) => {
    try {
      if (!file) return;
      const result = await uploadImage(file, "gallery-image");
      return result.url;
    } catch (error) {
      alert(error.message || "Upload failed");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      const url = await handleinput2();
      await PostGallaryImage({ sequence: GallaryData.sequence, image: url });
      history.push("/home-showcase");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    blogById();
  }, []);

  const blogById = async () => {
    try {
      setLoadingUi(true);
      const response = await getBlogById(id);
      setLoadingUi(false);
    } catch (error) {
      setLoadingUi(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoadingButton(true);
      history.push("/blogs");
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
                Sequence{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              {/* <input
                  type='text'
                  name='title'
                  placeholder='Title'
                  // value={blogData?.title}
                  className='addEmployee-inputField'

                /> */}
              <select
                onChange={handleChange}
                name="sequence"
                id=""
                className="addEmployee-inputField"
              >
                <option value="1">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel">Gallary Image </label>
              <input
                type="file"
                name="image"
                placeholder="Image"
                // value={blogData?.author}
                className="addEmployee-inputField"
                onChange={(e) =>
                  setGallaryData({ ...GallaryData, image: e.target.files[0] })
                }
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

export default AddGallary;
