import React, { useContext } from "react";
import InternetIcon from "../../assets/img/icons/InternetIcon";
import MailIcon from "../../assets/img/icons/MailIcon";
import { AppContexts } from "../../contexts/AppContext";

export default function WebsiteContact() {
  const { userData, setUserData } = useContext(AppContexts);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="subsection">
      <h2>Website - Contact</h2>
      <div className="social-block">
        <div className="data">
          <InternetIcon />
          <input
            type="text"
            name="website"
            placeholder="https://your-website.com"
            autoComplete="off"
            value={userData.website}
            onChange={onChange}
          />
        </div>
        <div className="data">
          <MailIcon />
          <input
            type="email"
            name="contactEmail"
            placeholder="your-contact@email.com"
            autoComplete="off"
            value={userData.contactEmail}
            onChange={onChange}
          />
        </div>
        <p className="warning">
          To reduce the risk of your account being hacked, we recommend using a
          different email address from the one used for login.
        </p>
      </div>
    </div>
  );
}
