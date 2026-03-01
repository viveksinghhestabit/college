import React from 'react';
import '../../../styles/ArtistsTable.css';
import SingleAgRow from './SingleAgRow';

const AGTable = (prop) => {

  return (
    <div className='table-wrapper' id='#scrollBar'>

      <table className='fl-table'>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Sequence</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            prop?.blogData?.map((blog, ind) => {
              return <SingleAgRow
                key={ind}
                index={ind}
                id={blog._id}
                deleteBlog={prop.deleteBlog}
                sequence={blog.sequence}
                image={blog.image}
              />

            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default AGTable;
