import React, { useState, useEffect, Fragment } from "react";
import searchIcon from "../../images/searchIcon.svg";
import "../../styles/UserPage.css";
import LoadingPage from "../utils/LoadingPage";
import { getEnquiry } from "../../redux/api";
import EnquiryTable from "./EnquiryTable";
import { CSVLink } from "react-csv";

const EnquiryPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setsearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterData, setfilterData] = useState([]);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const userData = await getEnquiry();
      setAllUsers(userData.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchInput !== "") {
      let filteredData = allUsers.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allUsers);
    }
  };

  const csvData = [
    ["Name", "Email", "Phone", "Message", "Source"],
    ...allUsers.map(({ name, source, email, phone, message }) => [
      name,
      source,
      email,
      phone,
      message,
    ]),
  ];
  return (
    <div className="user-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          <div className="user-firstSection">
            <div className="user-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter A Name"
                className="artist-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="user-filterDiv">
              <button className="user-filterBtn">
                <CSVLink
                  className="downloadbtn"
                  filename="my-file.csv"
                  data={csvData}
                >
                  Export to CSV
                </CSVLink>
                {/* <button>Export to CSV</button> */}
              </button>
            </div>
          </div>
          <div className="user-tableSection">
            {searchInput.length > 1 ? (
              <EnquiryTable Users={filterData} />
            ) : (
              <EnquiryTable Users={allUsers} />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default EnquiryPage;
