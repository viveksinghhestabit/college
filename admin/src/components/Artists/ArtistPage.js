import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import ArtistsTable from "./University/ArtistsTable";
import LoadingPage from "../utils/LoadingPage";
import { DeleteUniversity, getUniversity } from "../../redux/api";

import "../../styles/ArtistPage.css";

const ArtistPage = () => {
  const history = useHistory();
  const [searchInput, setsearchInput] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [universityData, setuniversityData] = useState([]);

  const unicall = async () => {
    setLoading(true);

    try {
      const res = await getUniversity();
      setuniversityData(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
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
  const deleteUniversity = async (id) => {
    try {
      const newarr = universityData?.filter((item) => item._id !== id);
      setuniversityData(newarr);
      await DeleteUniversity(id);
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
                onClick={() => history.push("/universities/add")}
              >
                <img src={addIcon} alt="add" className="artist-addIcon" />
                <span>Add University</span>
              </button>
            </div>
          </div>
          <div className="artist-tableSection">
            {searchInput.length > 1 ? (
              <ArtistsTable
                deleteUniversity={deleteUniversity}
                uniData={filterData}
              />
            ) : (
              <ArtistsTable
                uniData={universityData}
                deleteUniversity={deleteUniversity}
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ArtistPage;
