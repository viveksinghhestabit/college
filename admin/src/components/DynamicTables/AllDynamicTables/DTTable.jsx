import React from 'react';
import '../../../styles/ArtistsTable.css';
import SingleDTRow from './SingleDTRow';
import { useParams } from 'react-router';

const DTTable = (prop) => {
  return (
    <div className='table-wrapper' id='#scrollBar'>

      <table className='fl-table'>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Table Name</th>
            <th>Description</th>
            <th>Columns</th>
            <th>Rows</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            prop?.blogData?.map((blog, ind) => {
              return <SingleDTRow
                key={ind}
                index={ind}
                id={blog._id}
                collegeId={prop?.collegeId}
                tableName={blog.tableName}
                description={blog.description}
                columns={blog?.columns?.length}
                rows={blog?.rows?.length}
                deleteBlog={prop.deleteBlog}
                sequence={blog.sequence}
              />

            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default DTTable;
