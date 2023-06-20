import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope } from "react-icons/fa";
import TemplateList from "./TemplateList";
import UserUpdate from "./UserUpdate";
import { cssSetTemplates } from "../store";

const Profile = () => {
  const { cssAuth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(cssSetTemplates(cssAuth.id)); // Update the local state when templates change
  }, []);

  if (!cssAuth.id) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <div className="css-profile-main">
        <h3 className="css-proheader">My Components</h3>
        <TemplateList />
      </div>
      <div className="css-profile">
        <div>
          <h4 className="css-proheader">
            Welcome {cssAuth.username.charAt(0).toUpperCase() + cssAuth.username.slice(1)}!
          </h4>
          <p>
            <FaUser className="custom-icon" /> {cssAuth.username}
          </p>
          {cssAuth.email && (
            <p>
              <FaEnvelope className="custom-icon" /> {cssAuth.email}
            </p>
          )}
        </div>
        <div>
          <h4 className="proheader">Update Info</h4>
          <UserUpdate />
        </div>
      </div>
    </div>
  );
};

export default Profile;
