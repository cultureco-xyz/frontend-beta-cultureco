import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

function UserIcon({ fillColor = "#F5F1ED", size= 20 }) {
  return (
    <div>
      <FaRegCircleUser color={fillColor} size={size} />
    </div>
  );
}

export default UserIcon;