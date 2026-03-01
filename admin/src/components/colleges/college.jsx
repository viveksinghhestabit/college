import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import LoadingPage from "../utils/LoadingPage";
import { deleteCollege as DeleteCollege, getColleges } from "../../redux/api";

import "../../styles/ArtistPage.css";
import CollegeTable from "./CTable/CollegeTable";

const College = () => {
  const history = useHistory();
  const [searchInput, setsearchInput] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [universityData, setuniversityData] = useState([]);

  const unicall = async () => {
    setLoading(true);

    try {
      const response = await getColleges();
      setuniversityData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    unicall();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchInput !== "") {
      let filteredData = universityData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(universityData);
    }
  };
  const deleteCollege = async (id) => {
    try {
      const newarr = universityData?.filter((item) => item._id !== id);
      setuniversityData(newarr);
      await DeleteCollege(id);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="artist-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          <div className="artist-firstSection">
            <div className="artist-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Ex. Harvard University"
                className="artist-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="artist-addArtistDiv">
              <button
                className="artist-addBtn"
                onClick={() => history.push("/colleges/add")}
              >
                <img src={addIcon} alt="add" className="artist-addIcon" />
                <span>Add Colleges</span>
              </button>
            </div>
          </div>
          <div className="artist-tableSection">
            {searchInput.length > 1 ? (
              <CollegeTable
                deleteCollege={deleteCollege}
                uniData={filterData}
              />
            ) : (
              <CollegeTable
                uniData={universityData}
                deleteCollege={deleteCollege}
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default College;
