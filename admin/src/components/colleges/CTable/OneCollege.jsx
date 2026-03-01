import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

function OneCollege(prop) {
  return (
    <>
      <tr key={prop.index}>
        <td>{prop?.name}</td>
        <td>
          <img style={{ height: "40px", width: "75px", objectFit: "cover", borderRadius: "6px" }} src={prop?.photo} alt="no img" />
        </td>
        <td>{prop?.state}</td>
        <td> {prop?.level}</td>
        <td>{prop?.city}</td>
        <td><Button size="small" variant="contained"><Link style={{ textDecoration: "none", color: "white" }} to={`/colleges/${prop.id}/review`}>View Reviews</Link></Button></td>
        <td><Button size="small" variant="contained"><Link style={{ textDecoration: "none", color: "white" }} to={`/colleges/${prop.id}/course`}>View Courses</Link></Button></td>
        <td><Button size="small" variant="contained"><Link style={{ textDecoration: "none", color: "white" }} to={`/colleges/${prop.id}/table`}>{prop?.tables?.length} -  View Tables</Link></Button></td>
        {/*        <td>
 <Button size="small" variant="contained"><Link style={{textDecoration:"none",color:"white"}} to={`/Universities/addcourse/${prop.id}`}>Add Courses</Link></Button></td> */}

        <td className="text-right" >
          <div className="actions" style={{ display: "flex", justifyContent: "space-betweens" }}>
            <Link to={`/colleges/edit/${prop.id}`}> <button className='uni-edit-btn'><ModeEditIcon /> </button></Link>
            <Link onClick={() => prop?.deleteCollege(prop.id)}  ><button className='uni-delete-btn'><DeleteIcon /> </button></Link>
          </div>
        </td>


      </tr>
    </>
  )
}


// delete


export default OneCollege