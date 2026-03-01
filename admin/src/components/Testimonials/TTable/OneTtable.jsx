import React from "react";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

function OneTtable(prop) {
  return (
    <>
      <tr>
        <td>{prop?.index + 1}</td>
        <td>{prop?.name}</td>
        <td>{prop?.position}</td>
        <td>
          <img src={prop?.photo} alt="blog" height={30} width={30} />
        </td>
        <td style={{ maxWidth: "300px", overflow: "hidden" }}>
          {prop?.message}
        </td>
        <td className="text-right">
          <div
            className="actions"
            style={{ display: "flex", justifyContent: "space-betweens" }}
          >
            <Link to={`/testimonial/edit/${prop.id}`}>
              {" "}
              <button className="uni-edit-btn">
                <ModeEditIcon />{" "}
              </button>
            </Link>
            <Link onClick={() => prop?.deleteTestimonial(prop?.id)} to={"#"}>
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

export default OneTtable;
