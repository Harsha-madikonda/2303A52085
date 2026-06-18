import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Notification, NotificationType, PaginationParams } from "../types/notification";
import { fetchNotifications, getErrorMessage } from "../services/api";
import { Loader } from "../components/Loader";
import { NotificationCard } from "../components/NotificationCard";
import { Filter } from "../components/Filter";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalNotifications, setTotalNotifications] = useState(0);

  // Get parameters from URL
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || String(ITEMS_PER_PAGE), 10);
  const notificationType = (searchParams.get("notification_type") as NotificationType | null) || undefined;

  const totalPages = Math.ceil(totalNotifications / limit) || 1;

  // Fetch notifications
  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      setError(null);

      try {
        const params: PaginationParams = {
          page: currentPage,
          limit,
          notification_type: notificationType,
        };

        const response = await fetchNotifications(params);
        setNotifications(response.data);
        setTotalNotifications(response.total);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [currentPage, limit, notificationType]);

  // Handle filter change
  const handleTypeChange = (type: NotificationType | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    if (type) {
      newParams.set("notification_type", type);
    } else {
      newParams.delete("notification_type");
    }
    newParams.set("page", "1"); // Reset to first page on filter change
    setSearchParams(newParams);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", String(newLimit));
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Notifications Dashboard</h1>
        <p className="home-subtitle">
          Stay updated with your campus hiring evaluation progress
        </p>
      </div>

      {/* Filter Section */}
      <div className="controls-section">
        <Filter selectedType={notificationType} onTypeChange={handleTypeChange} />

        <div className="limit-control">
          <label htmlFor="limit-select" className="limit-label">
            Items per page:
          </label>
          <select
            id="limit-select"
            className="limit-select"
            value={limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
            disabled={loading}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && <Loader />}

      {/* Error State */}
      {error && !loading && (
        <div className="error-container">
          <div className="error-box">
            <h3 className="error-title">⚠️ Error Loading Notifications</h3>
            <p className="error-message">{error}</p>
            <button
              className="retry-button"
              onClick={() => {
                setError(null);
                setLoading(true);
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && notifications.length === 0 && (
        <div className="empty-state">
          <div className="empty-box">
            <p className="empty-icon">📭</p>
            <h3 className="empty-title">No Notifications</h3>
            <p className="empty-message">
              {notificationType
                ? `No ${notificationType} notifications found.`
                : "You're all caught up! No new notifications."}
            </p>
          </div>
        </div>
      )}

      {/* Notifications Grid */}
      {!loading && !error && notifications.length > 0 && (
        <>
          <div className="notifications-info">
            <p className="info-text">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, totalNotifications)} of{" "}
              {totalNotifications} notifications
            </p>
          </div>

          <div className="notifications-grid">
            {notifications.map((notification) => (
              <NotificationCard key={notification.ID} notification={notification} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          )}
        </>
      )}
    </div>
  );
};
