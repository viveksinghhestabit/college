import React from 'react';
import Oneuniveristy from './Oneuniveristy';
import '../../../styles/ArtistsTable.css';

const ArtistsTable = (props) => {

  return (
    <>


      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>University Name</th>
              <th>University Pic</th>
              <th>State</th>
              {/* <th>Country Code</th> */}
              <th>Status</th>
              <th>City</th>
              <th>Colleges</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props?.uniData ? (
              props?.uniData?.map((university, index) => {
                return (<Oneuniveristy
                  id={university?._id}
                  key={index}
                  photo={university?.logo}
                  name={university?.fullName}
                  level={university?.status}
                  deleteUniversity={props.deleteUniversity}
                  city={university?.city}
                  state={university?.state}
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

export default ArtistsTable;
