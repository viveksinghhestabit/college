import React from "react";
import "../../../styles/ArtistsTable.css";
import SingleState from "./SingleState";

const StatesTable = (prop) => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>S no.</th>
            <th>Name</th>
            <th>State Pic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {prop?.stateData?.map((state, ind) => {
            return (
              <SingleState
                key={ind}
                index={ind}
                id={state._id}
                deleteState={prop.deleteState}
                title={state.name}
                statePic={state.coverImage}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatesTable;
