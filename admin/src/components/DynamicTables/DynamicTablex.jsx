import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingPage from "../utils/LoadingPage";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import axios from "axios";
import "../../styles/EmployeePage.css";
import {
  deleteBlogs,
  deleteDyanmicTable,
  deleteGallaryImage,
  getBlogs,
  getCollegeById,
  getDyanmicTable,
  getGallaryImages,
} from "../../redux/api";
import DTTable from "./AllDynamicTables/DTTable";

const DynamicTables = () => {
  const history = useHistory();
  const [allblogData, setallblogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [filterData, setfilterData] = useState([]);
  const { id } = useParams();

  const fetchblogList = async () => {
    setLoading(true);
    try {
      const res = await getCollegeById(id);
      setallblogData(res?.data?.data?.tables);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchblogList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchInput !== "") {
      let filteredData = allblogData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allblogData);
    }
  };

  const deleteBlog = async (tableId, index) => {
    try {
      const newarr = allblogData.filter((item) => item._id !== tableId);
      setallblogData(newarr);
      const payload = {
        collegeId: id,
        tableId,
        index,
      };
      await deleteDyanmicTable(payload);
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
                onClick={() => history.push(`/colleges/${id}/table/add`)}
              >
                <img src={addIcon} alt="add" className="employee-addIcon" />
                <span>Add Table</span>
              </button>
            </div>
          </div>
          <div className="employee-tableSection">
            {searchInput.length > 1 ? (
              <DTTable
                blogData={filterData}
                collegeId={id}
                deleteBlog={deleteBlog}
              />
            ) : (
              <DTTable
                blogData={allblogData}
                collegeId={id}
                deleteBlog={deleteBlog}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicTables;
