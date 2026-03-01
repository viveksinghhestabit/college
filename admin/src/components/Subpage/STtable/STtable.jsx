import React from 'react';
import '../../../styles/ArtistsTable.css';
import OneSttable from './OneStTable';

const Sttable = (prop) => {

  return (
    <div className='table-wrapper' id='#scrollBar'>

      <table className='fl-table'>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Title</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            prop?.blogData?.map((blog, ind) => {
              return <OneSttable
                key={ind}
                index={ind}
                id={blog._id}
                body={blog.body}
                deleteBlog={prop.deleteBlog}
                author={blog.message}
                title={blog.title}
                course={blog.course}

              />

            })
          }
        </tbody>
      </table>
    </div >
  );
};

export default Sttable;
