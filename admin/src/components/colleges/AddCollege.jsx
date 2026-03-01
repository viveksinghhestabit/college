import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "react-phone-number-input/style.css";
import "../../styles/AddArtistForm.css";
import AlertTitle from "@mui/material/AlertTitle";
import LoadingPage from "../utils/LoadingPage";
import {
  updateCollege,
  getCollegeById,
  getUniversity,
  postColleges,
} from "../../redux/api";
import { uploadImage } from "../../utils/uploadHelper";
import Country from "../utils/Country.json";
import LoadingComponent from "../utils/LoadingButton";
import ReactQuill from "react-quill";

const initialState = {
  fullName: "",
  logo: "",
  university: "",
  coverpic: "",
  description: "",
  gallery: [],
  state: "",
  city: "",
  pincode: "",
  phone: "",
  website: "",
  address: "",
  status: "",
  yearOfEstabilish: "",
  reviews: [],
};

const AddCollege = () => {
  const [universityData, setuniversityData] = useState(initialState);
  const [countryState, setcountryState] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [loadingBtn, setloadingBtn] = useState(false);
  const [AllStates, setAllStates] = useState([]);
  const [AllCities, setAllCities] = useState([]);
  const [universityList, setuniversityList] = useState([]);
  // useEffect(() => {
  //   setcountryState(Country.getStatesOfCountry(`${universityData.country}`));
  // }, [universityData.country])

  useEffect(() => {
    // const states = Country
    setAllStates(Object.keys(Country));
  }, []);
  useEffect(() => {
    setAllCities(Country[universityData?.state]);
  }, [universityData?.state]);

  const handleChange = (e) => {
    const { name } = e.target;
    setuniversityData({ ...universityData, [name]: e.target.value });
  };

  const handlelogo = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      const result = await uploadImage(file, "college-logo");
      setuniversityData({ ...universityData, logo: result.url });
    } catch (error) {
      alert(error.message || "Logo upload failed");
    }
  };

  const handleCoverpic = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      const result = await uploadImage(file, "college-coverpic");
      setuniversityData({ ...universityData, coverpic: result.url });
    } catch (error) {
      alert(error.message || "Cover pic upload failed");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      setloadingBtn(true);
      await postColleges(universityData);
      setloadingBtn(false);
      history.push("/colleges");
    } catch (err) {
      setloadingBtn(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setloadingBtn(true);

    try {
      await updateCollege(universityData);
      history.push("/colleges");
      setloadingBtn(false);
    } catch (err) {
      setloadingBtn(false);
    }
  };

  const handleImages = async (e, index) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      const result = await uploadImage(file, `college-gallery-${index}`);

      let data = [...universityData.gallery];
      data[index] = result.url;
      setuniversityData({ ...universityData, gallery: data });
    } catch (error) {
      alert(error.message || "Image upload failed");
    }
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    let data = [...universityData?.gallery];
    data.splice(index, 1);
    setuniversityData({ ...universityData, gallery: data });
  };

  const addImages = (e) => {
    e.preventDefault();
    let newfield = e.target.value;
    setuniversityData({
      ...universityData,
      gallery: [...universityData?.gallery, newfield],
    });
  };

  const fetchUniversities = async () => {
    try {
      const response = await getUniversity();
      setuniversityList(response?.data?.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchUniversities();
    fetchCollegeById();
  }, []);

  const { id } = useParams();
  const fetchCollegeById = async () => {
    try {
      setLoading(true);
      const response = await getCollegeById(id);
      setuniversityData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  AddCollege.formats = [
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
  AddCollege.modules = {
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
                      College Name{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>{" "}
                    </label>
                    <input
                      type="text"
                      required="required"
                      name="fullName"
                      value={universityData?.fullName}
                      // id={universityData?.name?.length ? "" : "red-border"}
                      onChange={handleChange}
                      placeholder="College Name"
                      className={`${"addArtist-inputField"} `}
                    />
                  </div>
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">
                      Select a university{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>
                    </label>

                    <select
                      className="addArtist-selectField"
                      name="university"
                      // value={universityData?.university}
                      required
                      // disabled={universityData?.university}
                      // id={universityData?.state?.length ? "" : "red-border"}
                      placeholder="Select A State"
                      onChange={handleChange}
                    >
                      <option style={{ color: "red" }} value="">
                        Please Select A University
                      </option>
                      {universityList?.map((university, index) => {
                        return (
                          <option value={university?._id} key={index}>
                            {university?.fullName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* <button className=''>Upload</button> */}
                </div>

                {/* 2nd row */}
                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">College Logo</label>
                    <input
                      type="file"
                      name="logo"
                      onChange={handlelogo}
                      placeholder="Upload A Image"
                      className="mb-3 addArtist-inputField"
                    />
                  </div>

                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">Cover pic</label>
                    <input
                      type="file"
                      name="coverpic"
                      onChange={handleCoverpic}
                      placeholder="Upload A Image"
                      className="addArtist-inputField"
                    />
                  </div>
                </div>
                {!!universityData?.coverpic && (
                  <div className="d-flex w-100 justify-content-end mt-2">
                    {" "}
                    <img
                      src={universityData?.coverpic}
                      height={50}
                      width={50}
                      alt="logo"
                    />
                  </div>
                )}

                {/* 2nd row */}
                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">
                      States{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>
                    </label>

                    <select
                      className="addArtist-selectField"
                      name="state"
                      required
                      // id={universityData?.state?.length ? "" : "red-border"}
                      placeholder="Select A State"
                      onChange={handleChange}
                    >
                      <option style={{ color: "red" }} value="">
                        {" "}
                        {!!universityData?.state
                          ? `~${universityData?.state}~`
                          : `Please Select A State`}
                      </option>
                      {AllStates?.map((states, index) => {
                        return (
                          <option value={states} key={index}>
                            {states}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">
                      City{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>
                    </label>

                    <select
                      className="addArtist-selectField"
                      name="city"
                      disabled={!universityData?.state}
                      // id={universityData?.country?.length ? "" : "red-border"}
                      required
                      defaultValue="Select A Country"
                      onChange={handleChange}
                    >
                      <option value="">
                        {!!universityData?.city
                          ? `~${universityData?.city}~`
                          : `Please Select A City`}
                      </option>
                      <option value={"Ghaziabad"}>Ghaziabad</option>
                      {AllCities?.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                  </div>
                </div>

                {/* 3rd row */}
                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">Pincode</label>
                    <input
                      type="number"
                      name="pincode"
                      value={universityData?.city}
                      onChange={handleChange}
                      placeholder="Pincode"
                      className="addArtist-inputField"
                    />
                  </div>

                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">Website</label>
                    <input
                      type="text"
                      name="website"
                      value={universityData?.website}
                      onChange={handleChange}
                      placeholder="Website URL"
                      className="addArtist-inputField"
                    />
                  </div>
                </div>

                {/* 4th row */}
                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={universityData?.address}
                      onChange={handleChange}
                      placeholder="Full Address"
                      className="addArtist-inputField"
                    />
                  </div>

                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">Status</label>

                    <select
                      className="addArtist-selectField"
                      name="status"
                      // id={universityData?.country?.length ? "" : "red-border"}
                      required
                      defaultValue="Select A Country"
                      onChange={handleChange}
                    >
                      <option value="">
                        {!!universityData?.status
                          ? `~${universityData?.status}~`
                          : `Select a Status`}
                      </option>
                      <option value="closed">Closed</option>
                      <option value="running">Running</option>
                      <option value="coming-soon">Coming Soon</option>
                    </select>
                  </div>
                </div>

                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">
                      Year of Estabilish
                    </label>
                    <input
                      type="date"
                      name="yearOfEstabilish"
                      onChange={handleChange}
                      value={universityData?.yearOfEstabilish}
                      placeholder="1-4 Sentences"
                      className="addArtist-inputField"
                    />
                  </div>
                  <div className="addArtist-inputFieldDiv">
                    <label className="addArtist-inputLabel">College Type</label>
                    <select
                      className="addArtist-selectField"
                      name="collegeType"
                      // value={universityData?.university}
                      required
                      // disabled={universityData?.university}
                      // id={universityData?.state?.length ? "" : "red-border"}
                      placeholder="Select A State"
                      onChange={handleChange}
                    >
                      <option style={{ color: "red" }} value="">
                        Select college type
                      </option>
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>
                <div className="addArtist-alignRow">
                  <div className="addArtist-inputFieldDiv w-100">
                    <label className="addArtist-inputLabel">
                      Description{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>{" "}
                    </label>
                    {/* <textarea
                      type='text'
                      required="required"
                      name='description'
                      value={universityData?.description}
                      // id={universityData?.name?.length ? "" : "red-border"}
                      onChange={handleChange}
                      placeholder='Description'
                      className={`${"addArtist-inputField"} `}
                    /> */}
                    <ReactQuill
                      modules={AddCollege.modules}
                      formats={AddCollege.formats}
                      value={universityData?.description}
                      theme="snow"
                      onChange={(content, delta, source, editor) => {
                        setuniversityData({
                          ...universityData,
                          description: editor.getHTML(),
                        });
                      }}
                    />
                  </div>
                </div>
                {!!universityData?.logo && (
                  <div className="d-flex w-100 justify-content-end mt-2">
                    {" "}
                    <img
                      src={universityData?.logo}
                      height={50}
                      width={50}
                      alt="logo"
                    />
                  </div>
                )}

                <div className="addArtist-alignRow mt-3 flex-column align-items-start">
                  <h4>Gallery Pics</h4>
                  <div className="mb-5 w-100" controlId="formBasicEmail">
                    <div
                      className="mb-3 mt-4 flex-column d-flex justify-content-between align-items-center"
                      controlId="formBasicPassword"
                    >
                      <h6>
                        Add Images <span className="text-danger">*</span>
                      </h6>
                      <button
                        className="btn btn-primary btn-sm "
                        onClick={addImages}
                      >
                        Add Images
                      </button>
                    </div>
                    {universityData?.gallery?.map((item, index) => {
                      return (
                        <>
                          <div className="mb-3 w-100 mt-3 d-flex justify-content-between align-items-center">
                            <h5> Image {index + 1}</h5>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={(e) => removeImage(e, index)}
                            >
                              Remove {index + 1}
                            </button>
                          </div>
                          <input
                            type="file"
                            name=""
                            onChange={(e) => handleImages(e, index)}
                            placeholder="Choose Image"
                          />
                          <img
                            src={item}
                            alt="gallery-pic"
                            height={70}
                            width={70}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="addArtist-submitDetailDiv">
                  {!!id ? (
                    <button
                      className="addArtist-submitDetailBtn"
                      onClick={handleUpdate}
                    >
                      Update College
                      {loadingBtn && <LoadingComponent />}
                    </button>
                  ) : (
                    <button
                      className="addArtist-submitDetailBtn"
                      onClick={handlesubmit}
                    >
                      Add College
                      {loadingBtn && <LoadingComponent />}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default AddCollege;
