import React from 'react';
import '../../../../styles/ArtistsTable.css';
import OneReview from './OneReview';

const RTable = (props) => {

  return (
    <>
      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>feedback</th>
              <th>Stars</th>
              <th>Visible</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props?.uniData ? (
              props?.uniData?.map((university, index) => {
                return (<OneReview
                  id={university?._id}
                  key={index}
                  index={index}
                  email={university?.email}
                  name={university?.name}
                  feedback={university?.feedback}
                  stars={university?.stars}
                  isVisible={university?.isVisible}
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

export default RTable;
