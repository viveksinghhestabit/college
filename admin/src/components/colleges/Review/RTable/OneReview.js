import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

function OneReview(prop) {
  return (
    <>
      <tr key={prop.index}>
        <td>{prop?.index + 1}</td>
        <td>{prop?.name}</td>
        <td>{prop?.email}</td>
        <td>{prop?.feedback}</td>
        <td>{prop?.stars}</td>
        <td>{prop?.isVisible ? "true" : "false"}</td>
        {/* <td><Button size="small" variant="contained"><Link style={{ textDecoration: "none", color: "white" }} to={`/colleges/viewcourse/${prop?.id}`}>View Courses</Link></Button></td> */}


        <td className="text-right" >
          <div className="actions" style={{ display: "flex", justifyContent: "space-betweens" }}>
            {
              prop?.isVisible ?
                <Link onClick={() => prop?.deleteCollege(prop?.index, prop.isVisible)}  ><button className='uni-delete-btn'>UnHide </button></Link>
                : <Link onClick={() => prop?.deleteCollege(prop?.index, prop.isVisible)}  ><button className='uni-delete-btn '>Hide </button></Link>
            }
          </div>
        </td>


      </tr>
    </>
  )
}


// delete


export default OneReview