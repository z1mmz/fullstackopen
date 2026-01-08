import React from "react";
import { useSelector } from "react-redux";

const Notification = ({}) => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return null;
  const notificationStyle = {
    color: notification.type === "error" ? "red" : "green",
  };

  return (
    <div style={notificationStyle} className="notification">
      {notification.text}
    </div>
  );
};

export default Notification;
