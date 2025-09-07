import React, { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";

export default function SocialNetworkInput({ name, placeholder = "username" }) {
  const { userData, setUserData } = useContext(AppContexts);

  const onChange = (e) => {
    const { name, value } = e.target;
    const social = { ...userData.social };
    social[name] = value;
    setUserData((p) => ({ ...p, social }));
  };

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      value={userData?.social?.[name] || ""}
      onChange={onChange}
    />
  );
}
