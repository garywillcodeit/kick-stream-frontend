import React from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";

export default function ConfirmDeletionMenu() {
  const { resetMenuData, menuData } = useContext(AppContexts);

  const onConfirmDeletion = async () => {
    await menuData.confirmFn();
  };

  return (
    <div className="body">
      <p>
        This action cannot be undone. Do you really want to delete this video?
      </p>
      <div className="col-2-btn">
        <button className="button" onClick={() => resetMenuData()}>
          Cancel
        </button>
        <button className="button delete-btn" onClick={onConfirmDeletion}>
          Delete
        </button>
      </div>
    </div>
  );
}
