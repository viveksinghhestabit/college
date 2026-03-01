import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import addIcon from "../../../images/addIcon.svg";
import searchIcon from "../../../images/searchIcon.svg";
import LoadingPage from "../../utils/LoadingPage";

import "../../../styles/ArtistPage.css";
import CourseTable from "./CourseTable/CourseTable";
import { deleteCourse, getCourses } from "../../../redux/api";

const Course = () => {
  const history = useHistory();
  const [searchInput, setsearchInput] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [universityData, setuniversityData] = useState([]);
  const { id } = useParams();

  const unicall = async () => {
    setLoading(true);

    try {
      const response = await getCourses(id);
      setuniversityData(response?.data?.data?.courses);
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
  const deleteCollege = async (courseid, index) => {
    try {
      const newarr = universityData?.filter((item) => item._id !== courseid);
      setuniversityData(newarr);
      const payload = {
        collegeid: id,
        courseid,
        index,
      };
      await deleteCourse(payload);
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
                onClick={() => history.push(`/colleges/${id}/course/add`)}
              >
                <img src={addIcon} alt="add" className="artist-addIcon" />
                <span>Add Courses</span>
              </button>
            </div>
          </div>
          <div className="artist-tableSection">
            {searchInput.length > 1 ? (
              <CourseTable deleteCollege={deleteCollege} uniData={filterData} />
            ) : (
              <CourseTable
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

export default Course;
