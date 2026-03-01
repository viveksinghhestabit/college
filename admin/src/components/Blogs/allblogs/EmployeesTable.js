import React from 'react';
import '../../../styles/ArtistsTable.css';
import Singleblog from './Singleblog';

const EmployeesTable = (prop) => {

  return (
    <div className='table-wrapper' id='#scrollBar'>

      <table className='fl-table'>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Title</th>
            <th>Blog Pic</th>
            <th>Author</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            prop?.blogData?.map((blog, ind) => {
              return <Singleblog
                key={ind}
                index={ind}
                id={blog._id}
                body={blog.body}
                deleteBlog={prop.deleteBlog}
                author={blog.author}
                title={blog.title}
                tag={blog.tag}
                date={blog.createdAt}
                blogPic={blog.blogPic}
              />

            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
