import React from "react";
import ProfileContent from "../../components/Profile/ProfileContent/ProfileContent";
import { memo } from "react";

const Profile = () => {
  return (
    <div className="container px-5">
      <div className="row my-3">
        <div className="col-lg-12 col-md-12 col-12 mx-auto border rounded p-3">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
