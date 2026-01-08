import React from "react";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const variant = notification.type === "error" ? "danger" : "success";
  if (!notification) {
    return null;
  }
  return <Alert variant={variant}>{notification.text}</Alert>;
};

export default Notification;
