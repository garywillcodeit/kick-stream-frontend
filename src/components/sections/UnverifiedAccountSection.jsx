import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getRequest } from "../../utils/requests/serverRequests";
import toast from "react-hot-toast";

export default function UnverifiedAccountSection() {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    const ticket = queryParams.get("ticket");

    if (ticket) {
      getRequest("/verify-account?ticket=" + ticket).then(({ data }) => {
        toast.success(data.msg);
        navigate("/login");
      });
    }
  }, []);

  return (
    <section className="section access-section">
      <div className="inner-wrapper">
        <h1>Verify your account</h1>
        <p>
          An email has been sent to your email address. Pleas, click on the link
          in it to verify you email.
        </p>
        <Link to={"/login"} className="button">
          Back to access page
        </Link>
      </div>
    </section>
  );
}
