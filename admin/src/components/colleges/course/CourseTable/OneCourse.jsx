import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

function OneCourse(prop) {
  return (
    <>
      <tr key={prop.index}>
        <td>{prop?.index + 1}</td>
        <td>{prop?.name}</td>
        <td>{prop?.fee}</td>
        <td>{prop?.specialization}</td>
        {/* <td><Button size="small" variant="contained"><Link style={{ textDecoration: "none", color: "white" }} to={`/colleges/viewcourse/${prop?.id}`}>View Courses</Link></Button></td> */}


        <td className="text-right" >
          <div className="actions" style={{ display: "flex", justifyContent: "space-betweens" }}>
            {/* <Link to={`/colleges/edit/${prop?.id}`}> <button className='uni-edit-btn'><ModeEditIcon /> </button></Link> */}
            <Link onClick={() => prop?.deleteCollege(prop?.id, prop.index)}  ><button className='uni-delete-btn'><DeleteIcon /> </button></Link>
          </div>
        </td>


      </tr>
    </>
  )
}


// delete


export default OneCourse