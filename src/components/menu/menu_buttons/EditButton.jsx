import React from "react";
import EditIcon from "../../../assets/img/icons/EditIcon";
import { useNavigate } from "react-router-dom";

export default function EditButton({ slug }) {
  const navigate = useNavigate();

  const onEditVideo = async () => {
    navigate("/edit-content/" + slug);
  };
  return (
    <li>
      <button onClick={onEditVideo}>
        <EditIcon />
        Edit
      </button>
    </li>
  );
}
