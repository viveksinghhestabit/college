import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../styles/AddEmployeeForm.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PostSubpage,
  PostTestimonial,
  getBlogById,
  getSubpagesById,
  postBlog,
  updateBlogs,
  updateSubpages,
} from "../../redux/api";
import { uploadImage } from "../../utils/uploadHelper";
import LoadingPage from "../utils/LoadingPage";
import LoadingComponent from "../utils/LoadingButton";

const initialData = {
  title: "",
  course: "",
  body: [],
};

const AddSubpage = () => {
  const [blogData, setblogData] = useState(initialData);
  const [LoadingUi, setLoadingUi] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name } = e.target;
    setblogData({ ...blogData, [name]: e.target.value });
  };

  const handleinput2 = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const publicId = `subpage-photo-${Date.now()}`;
      const result = await uploadImage(file, publicId);
      setblogData({ ...blogData, photo: result.url });
    } catch (error) {
      alert(error.message || "Upload failed");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      await PostSubpage(blogData);
      history.push("/subpage");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };

  // edit

  const { id } = useParams();

  useEffect(() => {
    blogById();
  }, []);

  const blogById = async () => {
    try {
      setLoadingUi(true);
      const response = await getSubpagesById(id);
      setblogData(response?.data?.data);
      setLoadingUi(false);
    } catch (error) {
      setLoadingUi(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoadingButton(true);
      await updateSubpages(blogData);
      history.push("/subpage");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };

  AddSubpage.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  AddSubpage.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const removeSubpage = (index) => {
    let data = [...blogData?.body];
    data.splice(index, 1);
    setblogData({ ...blogData, body: data });
  };

  const AddSubpageBody = (e) => {
    e.preventDefault();
    let newfield = e.target.value;
    setblogData({
      ...blogData,
      body: [...blogData?.body, newfield],
    });
  };

  const handleSubpageBody = (e, index) => {
    let data = [...blogData.body];
    data[index] = e;
    setblogData({ ...blogData, body: data });
  };

  return (
    <div className="addEmployee-container">
      {LoadingUi ? (
        <LoadingPage />
      ) : (
        <div className="addEmployee-personalDetails">
          <div className="addEmployee-alignRow mt-3">
            <div className="addEmployee-inputFieldDiv mt-0">
              <label className="addEmployee-inputLabel">Title </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={blogData?.title}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
            <div className="addEmployee-inputLabel">
              <label className="addEmployee-inputLabel">Course </label>
              <select
                className="addArtist-selectField"
                name="course"
                required
                // id={universityData?.state?.length ? "" : "red-border"}
                placeholder="Select A Course"
                value={blogData?.course}
                onChange={handleChange}
              >
                <option value="">
                  {" "}
                  {!!blogData?.course
                    ? `~${blogData?.course}~`
                    : "Please Select A Course"}
                </option>
                <option value="MBA">MBA</option>
                <option value="PGDM">PGDM</option>
                <option value="BBA">BBA</option>
              </select>
            </div>
          </div>
          <div className="addEmployee-alignRow"></div>

          <div className="addEmployee-alignRow">
            <div className="addArtist-alignRow mt-3 flex-column align-items-start">
              <h4>Subpages</h4>
              <div className="mb-5 w-100" controlId="formBasicEmail">
                <div
                  className="mb-3 mt-4 flex-column d-flex justify-content-between align-items-center"
                  controlId="formBasicPassword"
                >
                  {/* <h6>Add Subpage <span className="text-danger">*</span></h6> */}
                  <button
                    className="btn btn-primary btn-sm "
                    onClick={AddSubpageBody}
                  >
                    Add Subpage Content
                  </button>
                </div>
                {blogData?.body?.map((item, index) => {
                  return (
                    <>
                      <div className="mb-3 w-100 mt-3 d-flex justify-content-between align-items-center">
                        <h5> Content {index + 1}</h5>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={(e) => removeSubpage(index)}
                        >
                          Remove {index + 1}
                        </button>
                      </div>
                      <div className="addEmployee-alignRow">
                        <div style={{ marginTop: "20px", width: "100%" }}>
                          <label className="addEmployee-inputLabel">
                            Body{" "}
                            <span style={{ color: "red", fontSize: "1.2rem" }}>
                              *
                            </span>{" "}
                          </label>
                          <ReactQuill
                            modules={AddSubpage.modules}
                            formats={AddSubpage.formats}
                            value={item}
                            theme="snow"
                            onChange={(content, delta, source, editor) => {
                              handleSubpageBody(editor.getHTML(), index);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
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

export default AddSubpage;
