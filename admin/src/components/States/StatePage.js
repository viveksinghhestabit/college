import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingPage from "../utils/LoadingPage";
import addIcon from "../../images/addIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import StatesTable from "./allstates/StatesTable";
import "../../styles/EmployeePage.css";
import { deleteStates, getStates } from "../../redux/api";

const StatePage = () => {
  const history = useHistory();
  const [allStateData, setAllStateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [filterData, setfilterData] = useState([]);

  const fetchStatesList = async () => {
    setLoading(true);
    try {
      const res = await getStates();
      setAllStateData(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatesList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchInput !== "") {
      let filteredData = allStateData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allStateData);
    }
  };

  const deleteState = async (id) => {
    try {
      const newarr = allStateData.filter((item) => item._id !== id);
      setAllStateData(newarr);
      await deleteStates(id);
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
                onClick={() => history.push("/states/add")}
              >
                <img src={addIcon} alt="add" className="employee-addIcon" />
                <span>Add States</span>
              </button>
            </div>
          </div>
          <div className="employee-tableSection">
            {searchInput.length > 1 ? (
              <StatesTable stateData={filterData} deleteState={deleteState} />
            ) : (
              <StatesTable stateData={allStateData} deleteState={deleteState} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StatePage;
