import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
};

function Oneuniveristy(prop) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <td><Button size="small" variant="contained"><Link style={{ textDecoration: "none", color: "white" }} to={`/Universities/viewcourse/${prop.id}`}>View Courses</Link></Button></td>
        {/*        <td>
 <Button size="small" variant="contained"><Link style={{textDecoration:"none",color:"white"}} to={`/Universities/addcourse/${prop.id}`}>Add Courses</Link></Button></td> */}

        <td className="text-right" >
          <div className="actions" style={{ display: "flex", justifyContent: "space-betweens" }}>
            <button className='uni-view-btn ' onClick={handleShow}><VisibilityIcon /> </button>
            <Link to={`/Universities/edit/${prop.id}`}> <button className='uni-edit-btn'><ModeEditIcon /> </button></Link>
            <Link onClick={() => prop.deleteUniversity(prop.id)}  ><button className='uni-delete-btn'><DeleteIcon /> </button></Link>
          </div>
        </td>


      </tr>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </div>
      </Modal>
    </>
  )
}


// delete


export default Oneuniveristy