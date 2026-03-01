import React from "react";
import "../../../styles/ArtistsTable.css";
import OneTtable from "./OneTtable";

const Ttable = (prop) => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>S no.</th>
            <th>Title</th>
            <th>Position</th>
            <th>Photo</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {prop?.testimonialData?.map((testimonial, ind) => {
            return (
              <OneTtable
                key={ind}
                index={ind}
                id={testimonial._id}
                deleteTestimonial={prop.deleteTestimonial}
                message={testimonial.message}
                name={testimonial.name}
                position={testimonial.position}
                date={testimonial.createdAt}
                photo={testimonial.photo}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ttable;
