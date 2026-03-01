import React from "react";
import "../../../styles/ArtistsTable.css";
import SingleAsRow from "./SingleAsRow";

const ASTable = (prop) => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>S no.</th>
            <th>Title</th>
            <th>Sub-title</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {prop?.showcaseData?.map((showcaseData, ind) => {
            return (
              <SingleAsRow
                key={ind}
                index={ind}
                id={showcaseData._id}
                deleteShowcase={prop.deleteShowcase}
                title={showcaseData.title}
                subtitle={showcaseData.subtitle}
                image={showcaseData.image}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ASTable;
