import React, { useState } from "react";
import { useContext } from "react";
import { AppContexts } from "../../contexts/AppContext";
import TextArea from "../inputs/TextArea";
import textLimiter from "../../utils/features/textLimiter";
import toast from "react-hot-toast";
import { postRequest } from "../../utils/requests/serverRequests";
import useError from "../../hooks/useError.js";
import reportMessageValidator from "../../utils/validators/reportMessageValidator";

export default function ReportMenu() {
  const [reason, setReason] = useState("");
  const { resetMenuData, menuData } = useContext(AppContexts);
  const { errorHandler } = useError();

  const onReport = async (reason) => {
    const loadToast = toast.loading("Sending report...");
    try {
      reportMessageValidator(reason);

      let path = `/report/${menuData.type}/${menuData.itemId.replace("@", "")}`;

      const { data } = await postRequest(path, { reason });

      toast.success(data.msg);
      resetMenuData();
    } catch (error) {
      errorHandler(error);
    } finally {
      toast.remove(loadToast);
    }
  };

  const onChange = (e) => {
    let { value } = e.target;
    setReason(textLimiter(value));
  };

  return (
    <div className="body">
      <TextArea
        inputTitle={"Report reason"}
        placeholder={`Why do you report this ${menuData.type}?`}
        maxLength={1000}
        value={reason}
        onChange={onChange}
      />

      <div className="col-2-btn">
        <button className="cancel-button" onClick={() => resetMenuData()}>
          Cancel
        </button>
        <button className="button " onClick={() => onReport(reason)}>
          Report
        </button>
      </div>
    </div>
  );
}
