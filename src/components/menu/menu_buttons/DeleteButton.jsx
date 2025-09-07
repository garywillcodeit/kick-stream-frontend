import React, { useContext } from "react";
import DeleteIcon from "../../../assets/img/icons/DeleteIcon";
import useError from "../../../hooks/useError.js";
import toast from "react-hot-toast";
import { deleteRequest } from "../../../utils/requests/serverRequests";
import { AppContexts } from "../../../contexts/AppContext";
import { ProfileContext } from "../../../contexts/ProfileContext.jsx";

export default function DeleteButton({ type, itemId }) {
  const { activeMenu, resetMenuData } = useContext(AppContexts);
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { errorHandler } = useError();

  const onDelete = async () => {
    activeMenu({
      component: "confirm-deletion",
      title: "Confirm deletion",
      type,
      itemId,
      confirmFn,
    });
  };

  const confirmFn = async () => {
    const loadToast = toast.loading("Deleting video...");

    try {
      const path = "/manage-content/" + itemId;
      const { data } = await deleteRequest(path);

      let contents = [...profileData.contents];
      contents = contents.filter((e) => e._id !== itemId);
      setProfileData((p) => ({ ...p, contents }));

      resetMenuData();
      toast.success(data.msg);
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  return (
    <li>
      <button onClick={onDelete}>
        <DeleteIcon />
        Delete
      </button>
    </li>
  );
}
