import type { Notification } from "../types/notification";

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "Event":
        return "badge-event";
      case "Result":
        return "badge-result";
      case "Placement":
        return "badge-placement";
      default:
        return "badge-default";
    }
  };

  const formatDate = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="notification-card">
      <div className="notification-header">
        <span className={`badge ${getTypeColor(notification.Type)}`}>
          {notification.Type}
        </span>
        <span className="notification-timestamp">
          {formatDate(notification.Timestamp)}
        </span>
      </div>
      <div className="notification-body">
        <p className="notification-message">{notification.Message}</p>
      </div>
      <div className="notification-footer">
        <span className="notification-id">ID: {notification.ID}</span>
      </div>
    </div>
  );
};
