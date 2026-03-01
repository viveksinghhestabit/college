import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import LoadingPage from "../../utils/LoadingPage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialData = {
  name: "",
  coverImage: "",
};

function EditState() {
  const [stateData, setstateData] = useState(initialData);
  const [getstateData, setgetstateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    const { name } = e.target;
    setstateData({ ...stateData, [name]: e.target.value });
  };

  const handleinput2 = (e) => {
    setstateData({ ...stateData, profilePic: e.target.files[0] });
  };

  const handleinput3 = (e) => {
    setstateData({ ...stateData, thumbnail: e.target.files[0] });
  };

  const handlelinks = (e) => {
    const { name } = e.target;
    setstateData({
      ...stateData,
      links: { ...stateData.links, [name]: e.target.value },
    });
  };

  //Update form

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("writerName", stateData.writerName);
    formData.append("writerTagline", stateData.writerTagline);
    formData.append("title", stateData.title);
    formData.append("date", stateData.date);
    formData.append("body", stateData.body);
    formData.append("tag", stateData.tag);
    formData.append("profilePic", stateData.profilePic);
    formData.append("thumbnail", stateData.thumbnail);
    formData.append("minutes", stateData.minutes);
    formData.append("links[fb]", stateData.links.fb);
    formData.append("links[insta]", stateData.links.insta);
    formData.append("links[twitter]", stateData.links.twitter);
    formData.append("links[linkedin]", stateData.links.linkedin);
    try {
      await axios.patch(
        `https://flywise-admin.herokuapp.com/api/updateBlog/${param.id}`,
        formData
      );
      history.push("/blogs");
    } catch (error) {
      alert(error);
    }
  };

  //display date input box
  let blogdate = getstateData.date;
  blogdate = moment(blogdate).format("YYYY-MM-DD");

  // React Quill Changes

  EditState.formats = [
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
  EditState.modules = {
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

  return (
    <>
      <div className="addEmployee-container">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="addEmployee-personalDetails">
            {/* 1st row */}

            <div className="addEmployee-alignRow">
              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">
                  Writer Name{" "}
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </label>
                <input
                  type="text"
                  name="writerName"
                  placeholder="Full Name"
                  defaultValue={getstateData.writerName}
                  className="addEmployee-inputField"
                  onChange={handleChange}
                />
              </div>
              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">
                  Writer Tagline{" "}
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </label>
                <input
                  type="text"
                  name="writerTagline"
                  defaultValue={getstateData.writerTagline}
                  placeholder="Writer Tagling"
                  className="addEmployee-inputField"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 2nd row */}

            <div className="addEmployee-alignRow">
              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">
                  Date{" "}
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  placeholder="Date"
                  defaultValue={blogdate}
                  className="addEmployee-inputField"
                  onChange={handleChange}
                />
              </div>

              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">
                  Time To Read (Minutes)
                </label>
                <input
                  name="minutes"
                  defaultValue={getstateData.minutes}
                  onChange={handleChange}
                  className="addEmployee-inputField"
                  type="number"
                />
              </div>
            </div>

            {/* 3rd row */}

            <div className="addEmployee-alignRow">
              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">
                  Title{" "}
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={getstateData.title}
                  placeholder="Title Tagling"
                  className="addEmployee-inputField"
                  onChange={handleChange}
                />
              </div>
              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">Writer Profile</label>
                <input
                  type="file"
                  name="profilePic"
                  placeholder="Writer Profile"
                  className="addEmployee-inputField"
                  onChange={handleinput2}
                />
              </div>
            </div>

            {/* 4th row */}

            <div className="addEmployee-alignRow">
              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">Hashtags</label>
                <input
                  className="addEmployee-inputField"
                  defaultValue={getstateData.tag}
                  onChange={handleChange}
                  type="text"
                  name="tag"
                />
              </div>

              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">Thumb Nail</label>
                <input
                  type="file"
                  name="thumbnail"
                  placeholder="Thumbnail"
                  className="addEmployee-inputField"
                  onChange={handleinput3}
                />
              </div>
            </div>

            {/* 5th row */}
            <div className="addEmployee-alignRow">
              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">
                  Author's Socials
                </label>
                <div className="addEmployee-inputField">
                  <label className="addEmployee-inputLabel">Facebook</label>
                  <input
                    defaultValue={getstateData?.links?.fb}
                    className="addEmployee-inputField"
                    type="text"
                    onChange={handlelinks}
                    name="fb"
                  />

                  <label className="addEmployee-inputLabel">Linkedin</label>
                  <input
                    className="addEmployee-inputField"
                    defaultValue={getstateData?.links?.linkedin}
                    type="text"
                    onChange={handlelinks}
                    name="linkedin"
                  />
                </div>
              </div>

              <div className="addEmployee-inputFieldDiv">
                <label className="addEmployee-inputLabel">
                  Author's Socials
                </label>
                <div className="addEmployee-inputField">
                  <label className="addEmployee-inputLabel">Instagram</label>
                  <input
                    className="addEmployee-inputField"
                    defaultValue={getstateData?.links?.insta}
                    type="text"
                    onChange={handlelinks}
                    name="insta"
                  />

                  <label className="addEmployee-inputLabel">Twitter</label>
                  <input
                    className="addEmployee-inputField"
                    defaultValue={getstateData?.links?.twitter}
                    type="text"
                    onChange={handlelinks}
                    name="twitter"
                  />
                </div>
              </div>
            </div>

            <div className="addEmployee-alignRow">
              <div style={{ marginTop: "20px", width: "100%" }}>
                <label className="addEmployee-inputLabel">
                  Body{" "}
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </label>
                <ReactQuill
                  modules={EditState.modules}
                  formats={EditState.formats}
                  onChange={(content, delta, source, editor) =>
                    setstateData({ ...stateData, body: editor.getHTML() })
                  }
                  defaultValue={getstateData?.body}
                />
              </div>
            </div>

            <div className="addEmployee-submitDetailDiv">
              <button
                className="addEmployee-submitDetailBtn"
                onClick={handlesubmit}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditState;
