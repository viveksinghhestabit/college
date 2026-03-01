import React from 'react';
import '../../../styles/ArtistsTable.css';
import OneCollege from './OneCollege';

const CollegeTable = (props) => {

  return (
    <>


      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>College Name</th>
              <th>College Pic</th>
              <th>State</th>
              {/* <th>Country Code</th> */}
              <th>Status</th>
              <th>City</th>
              <th>Reviews</th>
              <th>Courses</th>
              <th>Tables</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props?.uniData ? (
              props?.uniData?.map((university, index) => {
                return (<OneCollege
                  id={university?._id}
                  key={index}
                  photo={university?.logo}
                  name={university?.fullName}
                  level={university?.status}
                  city={university?.city}
                  tables={university?.tables}
                  state={university?.state}
                  deleteCollege={props?.deleteCollege}

                />
                )
              })) : ("no Data")
            }
          </tbody>
        </table>
      </div>

    </>
  );
};

export default CollegeTable;
