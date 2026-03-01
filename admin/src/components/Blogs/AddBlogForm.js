import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../styles/AddEmployeeForm.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getBlogById, postBlog, updateBlogs } from "../../redux/api";
import { uploadImage } from "../../utils/uploadHelper";
import LoadingPage from "../utils/LoadingPage";
import LoadingComponent from "../utils/LoadingButton";

const initialData = {
  title: "",
  author: "",
  body: "",
  blogPic: "",
};

const AddBlogForm = () => {
  const { id } = useParams();

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
      
      const result = await uploadImage(file, "blog-pic");
      setblogData({ ...blogData, blogPic: result.url });
    } catch (error) {
      alert(error.message || "Upload failed");
    }
  };

  AddBlogForm.formats = [
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
  AddBlogForm.modules = {
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      await postBlog(blogData);
      history.push("/blogs");
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
      setblogData(response?.data?.data);
      setLoadingUi(false);
    } catch (error) {
      setLoadingUi(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoadingButton(true);
      await updateBlogs(blogData);
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
                Title{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={blogData?.title}
                className="addEmployee-inputField"
                id={blogData?.writerName?.length ? "" : "red-border"}
                onChange={handleChange}
              />
            </div>
            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel">Author </label>
              <input
                type="text"
                id={blogData?.writerTagline?.length ? "" : "red-border"}
                name="author"
                placeholder="Author"
                value={blogData?.author}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addEmployee-alignRow">
            <div className="addEmployee-inputFieldDiv w-100">
              <label className="addEmployee-inputLabel">Blog Pic</label>
              <input
                type="file"
                name="blogPic"
                placeholder="Blog Pic"
                className="addEmployee-inputField"
                onChange={handleinput2}
              />
            </div>
          </div>
          {!!blogData?.blogPic && (
            <img
              src={blogData?.blogPic}
              height={100}
              className="mt-3"
              width={100}
              alt="blog-pic"
            />
          )}

          <div className="addEmployee-alignRow">
            <div style={{ marginTop: "20px", width: "100%" }}>
              <label className="addEmployee-inputLabel">
                Body <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <ReactQuill
                id={blogData?.body?.length ? "" : "red-border"}
                modules={AddBlogForm.modules}
                formats={AddBlogForm.formats}
                value={blogData?.body}
                theme="snow"
                onChange={(content, delta, source, editor) => {
                  setblogData({ ...blogData, body: editor.getHTML() });
                }}
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

export default AddBlogForm;
