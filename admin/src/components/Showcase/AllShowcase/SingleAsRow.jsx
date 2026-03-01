import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function SingleAsRow(prop) {
  return (
    <>
      <tr>
        <td width="5%">{prop?.index + 1}</td>
        <td width="25%">{prop?.title}</td>
        <td width="40%">{prop?.subtitle}</td>
        <td width="20%">
          <img src={prop?.image} alt="blog" height={30} width={30} />
        </td>
        <td width="10%" className="text-right">
          <div
            className="actions"
            style={{ display: "flex", justifyContent: "space-betweens" }}
          >
            <Link to={`/home-showcase/edit/${prop.id}`}>
              <button className="uni-edit-btn">
                <ModeEditIcon />
              </button>
            </Link>
            <Link onClick={() => prop?.deleteShowcase(prop?.id)} to={"#"}>
              <button className="uni-delete-btn">
                <DeleteIcon />
              </button>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

export default SingleAsRow;
