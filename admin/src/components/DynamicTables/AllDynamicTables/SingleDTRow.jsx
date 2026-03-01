import React from "react";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

function SingleDTRow(prop) {
  return (
    <>
      <tr>
        <td>{prop?.index + 1}</td>
        <td>{prop?.tableName}</td>
        <td>{prop?.description}</td>
        <td>{prop?.columns}</td>
        <td>{prop?.rows}</td>
        <td className="text-right">
          <div
            className="actions"
            style={{ display: "flex", justifyContent: "space-betweens" }}
          >
            <Link to={`/colleges/${prop?.collegeId}/edit/${prop?.id}`}>
              {" "}
              <button className="uni-edit-btn">
                <ModeEditIcon />{" "}
              </button>
            </Link>
            <Link
              onClick={() => prop?.deleteBlog(prop?.id, prop.index)}
              to={"#"}
            >
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

export default SingleDTRow;
