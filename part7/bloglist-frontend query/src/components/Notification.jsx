import { useContext } from "react";
import NotificationContext from "../notificationContext";

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  console.log("Notification:", notification);
  if (!notification) return null;
  const notificationStyle = {
    color: notification.type === "error" ? "red" : "green",
  };

  return (
    <div style={notificationStyle} className="notification">
      {notification.message}
    </div>
  );
};

export default Notification;
