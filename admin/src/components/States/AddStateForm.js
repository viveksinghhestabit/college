import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../styles/AddEmployeeForm.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { getStateById, postState, updateStates } from "../../redux/api";
import LoadingPage from "../utils/LoadingPage";
import LoadingComponent from "../utils/LoadingButton";

const initialData = {
  name: "",
  coverImage: "",
};

const AddStateForm = () => {
  const { id } = useParams();

  const [stateData, setStateData] = useState(initialData);
  const [LoadingUi, setLoadingUi] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    stateById();
  }, []);

  const handleChange = (e) => {
    const { name } = e.target;
    setStateData({ ...stateData, [name]: e.target.value });
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
      setStateData({ ...stateData, coverImage: response?.data?.url });
    } catch (error) {
      alert(error);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      await postState(stateData);
      history.push("/states");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };

  const stateById = async () => {
    try {
      setLoadingUi(true);
      const response = await getStateById(id);
      setStateData(response?.data?.data);
      setLoadingUi(false);
    } catch (error) {
      setLoadingUi(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoadingButton(true);
      await updateStates(stateData);
      history.push("/states");
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
                State Name{" "}
                <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                placeholder="State name"
                defaultValue={stateData.name}
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
          {!!stateData?.coverImage && (
            <img
              src={stateData?.coverImage}
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

export default AddStateForm;
