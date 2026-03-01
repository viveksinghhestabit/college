import React, { useState, useEffect } from "react";
import LoadingPage from "../../utils/LoadingPage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../../../styles/AddArtistForm.css";
import { State } from "country-state-city";
import { useParams } from "react-router-dom";
const initialState = {
  name: "",
  uniPic: "",
  country: "",
  state: "",
  level: "",
  remarks: "",
  uniType: "",
  private: {},
  public: {},
};

function Edituniversity() {
  const [unidata, setunidata] = useState([]); //use to display the data in inputs only
  const [universityData, setuniversityData] = useState(initialState); //main state
  const [countryState, setcountryState] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    setcountryState(State.getStatesOfCountry(`${universityData.country}`));
  }, [universityData.country]);

  useEffect(() => {
    getunidata();
  }, []);

  const getunidata = async () => {
    try {
      const res = await axios.get(
        `https://flywise-admin.herokuapp.com/api/uniById/${param.id}`
      );
      setunidata(res.data.uni);
      setuniversityData(res.data.uni);
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setuniversityData({ ...universityData, [name]: e.target.value });
  };

  const handleinput2 = (e) => {
    setuniversityData({ ...universityData, uniPic: e.target.files[0] });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", universityData.name);
    formData.append("uniPic", universityData.uniPic);
    formData.append("level", universityData.level);
    formData.append("country", universityData.country);
    formData.append("state", universityData.state);
    formData.append("remarks", universityData.remarks);
    formData.append("uniType", universityData.uniType);
    formData.append("private[key]", universityData.private["key"]);
    formData.append("public[key2]", universityData.public["key2"]);

    try {
      await axios.patch(
        `https://flywise-admin.herokuapp.com/api/updateUniversity/${param.id}`,
        formData
      );
      history.push("/Universities");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <div className="addArtist-container">
        {loading ? (
          <LoadingPage />
        ) : (
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
                    University Name{" "}
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={unidata.name}
                    onChange={handleChange}
                    placeholder="University Name"
                    className="addArtist-inputField"
                  />
                </div>

                <div className="addArtist-inputFieldDiv">
                  <label className="addArtist-inputLabel">
                    University Image
                  </label>
                  <input
                    type="file"
                    name="uniPic"
                    onChange={handleinput2}
                    placeholder="Upload A Image"
                    className="addArtist-inputField"
                  />
                </div>
              </div>

              {/* 2nd row */}

              <div className="addArtist-alignRow">
                <div className="addArtist-inputFieldDiv">
                  <label className="addArtist-inputLabel">
                    Country{" "}
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </label>

                  <select
                    className="addArtist-selectField"
                    name="country"
                    defaultValue={unidata.country}
                    onChange={handleChange}
                  >
                    <option value="">{unidata.country}</option>
                    <option value="US">USA</option>
                    <option value="GB">UK</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>

                <div className="addArtist-inputFieldDiv">
                  <label className="addArtist-inputLabel">
                    States{" "}
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </label>

                  <select
                    className="addArtist-selectField"
                    name="state"
                    defaultValue={unidata.state}
                    placeholder="Select A State"
                    onChange={handleChange}
                  >
                    {countryState.length > 0 ? (
                      countryState.map((states, index) => {
                        return (
                          <option value={states.name} key={index}>
                            {states.name}
                          </option>
                        );
                      })
                    ) : (
                      <option style={{ color: "red" }} value="">
                        {unidata.state}
                      </option>
                    )}
                  </select>
                </div>
              </div>

              {/* 3rd row */}
              <div className="addArtist-alignRow">
                <div className="addArtist-inputFieldDiv">
                  <label className="addArtist-inputLabel">
                    University Level{" "}
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </label>
                  <select
                    className="addArtist-selectField"
                    name="level"
                    onChange={handleChange}
                  >
                    <option value="">{unidata.level}</option>
                    <option value="1">Tier 1</option>
                    <option value="2">Tier 2</option>
                    <option value="3">Tier 3</option>
                  </select>
                </div>
                <div className="addArtist-inputFieldDiv">
                  <label className="addArtist-inputLabel">Remarks</label>
                  <input
                    type="text"
                    name="remarks"
                    defaultValue={unidata.remarks}
                    onChange={handleChange}
                    placeholder="1-4 Sentences"
                    className="addArtist-inputField"
                  />
                </div>
              </div>

              {/* 4th row */}
              <div className="addArtist-alignRow">
                <div className="addArtist-inputFieldDiv">
                  <label className="addArtist-inputLabel">
                    University Type
                  </label>
                  <select
                    className="addArtist-selectField"
                    name="uniType"
                    onChange={handleChange}
                  >
                    <option value="">{unidata.uniType}</option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                  </select>
                </div>
              </div>

              <div className="addArtist-submitDetailDiv">
                <button
                  className="addArtist-submitDetailBtn"
                  onClick={handlesubmit}
                >
                  Update University
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Edituniversity;
