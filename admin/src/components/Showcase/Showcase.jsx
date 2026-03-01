import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingPage from "../utils/LoadingPage";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import "../../styles/EmployeePage.css";
import { deleteShowcaseImages, getShowcaseImages } from "../../redux/api";
import ASTable from "./AllShowcase/ASTable";

const Showcase = () => {
  const history = useHistory();
  const [showcaseData, setshowcaseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [filterData, setfilterData] = useState([]);

  const fetchShowcaseList = async () => {
    setLoading(true);
    try {
      const res = await getShowcaseImages();
      setshowcaseData(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowcaseList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchInput !== "") {
      let filteredData = showcaseData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(showcaseData);
    }
  };

  const deleteShowcase = async (id) => {
    try {
      const newarr = showcaseData.filter((item) => item._id !== id);
      setshowcaseData(newarr);
      await deleteShowcaseImages(id);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="employee-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="employee-firstSection">
            <div className="employee-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter a Name , Title and Author etc"
                className="artist-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="employee-addEmployeeDiv">
              <button
                className="employee-addBtn"
                onClick={() => history.push("/home-showcase/add")}
              >
                <img src={addIcon} alt="add" className="employee-addIcon" />
                <span>Add Showcase Image</span>
              </button>
            </div>
          </div>
          <div className="employee-tableSection">
            {searchInput.length > 1 ? (
              <ASTable
                showcaseData={filterData}
                deleteShowcase={deleteShowcase}
              />
            ) : (
              <ASTable
                showcaseData={showcaseData}
                deleteShowcase={deleteShowcase}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Showcase;
