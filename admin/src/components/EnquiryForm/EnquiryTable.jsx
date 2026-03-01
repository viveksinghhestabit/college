import React from "react";
import "../../styles/ArtistsTable.css";

const EnquiryTable = (props) => {
  const { Users } = props;
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Message</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {Users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.phone ? user.phone : "NA"}</td>
              <td>{user.email ? user.email : "NA"}</td>
              <td>{user.message ? user.message : "NA"}</td>
              <td>{user.source ? user.source : "NA"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiryTable;
