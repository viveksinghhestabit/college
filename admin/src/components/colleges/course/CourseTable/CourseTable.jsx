import React from 'react';
import '../../../../styles/ArtistsTable.css';
import OneCourse from './OneCourse';

const CourseTable = (props) => {

  return (
    <>
      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Fees</th>
              <th>Specialization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props?.uniData ? (
              props?.uniData?.map((university, index) => {
                return (<OneCourse
                  id={university?._id}
                  key={index}
                  index={index}
                  photo={university?.logo}
                  name={university?.name}
                  specialization={university?.specialization}
                  fee={university?.fee}
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

export default CourseTable;
