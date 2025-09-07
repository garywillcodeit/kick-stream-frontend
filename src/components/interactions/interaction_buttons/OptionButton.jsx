import React, { useContext } from "react";
import { AppContexts } from "../../../contexts/AppContext";
import OptionsIcon from "../../../assets/img/icons/OptionsIcon";

export default function OptionButton() {
  const { activeMenu } = useContext(AppContexts);

  const onOpenVideoOption = () => {
    activeMenu({ component: "video", title: "Option" });
  };

  return (
    <button onClick={onOpenVideoOption}>
      <OptionsIcon />
    </button>
  );
}
