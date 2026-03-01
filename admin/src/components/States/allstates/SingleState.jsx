import React from "react";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

function SingleState(prop) {
  return (
    <>
      <tr>
        <td>{prop?.index + 1}</td>
        <td>{prop?.title}</td>
        <td>
          <img src={prop?.statePic} alt="blog" height={30} width={30} />
        </td>
        <td className="text-right">
          <div
            className="actions"
            style={{ display: "flex", justifyContent: "space-betweens" }}
          >
            <Link to={`/states/edit/${prop.id}`}>
              {" "}
              <button className="uni-edit-btn">
                <ModeEditIcon />{" "}
              </button>
            </Link>
            <Link onClick={() => prop?.deleteState(prop?.id)} to={"#"}>
              <button className="uni-delete-btn">
                <DeleteIcon />{" "}
              </button>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

export default SingleState;
