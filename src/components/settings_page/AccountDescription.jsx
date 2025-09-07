import React, { useContext } from "react";
import TextArea from "../inputs/TextArea";
import { AppContexts } from "../../contexts/AppContext";
import textLimiter from "../../utils/features/textLimiter";

export default function AccountDescription() {
  const { userData, setUserData } = useContext(AppContexts);

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserData((p) => ({ ...p, [name]: textLimiter(value, 200) }));
  };

  return (
    <div className="subsection">
      <h2>Description</h2>
      <TextArea
        name={"description"}
        value={userData.description}
        onChange={onChange}
      />
    </div>
  );
}
