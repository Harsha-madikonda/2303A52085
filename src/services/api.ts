import axios from "axios";
import type { Notification, ApiResponse, PaginationParams } from "../types/notification";

/**
 * Priority mapping for notification types
 * Higher number = higher priority
 */
const PRIORITY_MAP: Record<string, number> = {
  Event: 3,
  Result: 2,
  Placement: 1,
};

/**
 * Fetch notifications from the API
 * @param params - Pagination and filter parameters
 * @returns Promise with notifications and metadata
 */
export const fetchNotifications = async (
  params: PaginationParams
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<Notification[]>(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        params: {
          page: params.page,
          limit: params.limit,
          ...(params.notification_type && { notification_type: params.notification_type }),
        },
      }
    );

    let notifications = response.data || [];

    // Sort by priority (descending) and then by timestamp (newest first)
    notifications.sort((a, b) => {
      const priorityA = PRIORITY_MAP[a.Type] || 0;
      const priorityB = PRIORITY_MAP[b.Type] || 0;

      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      const dateA = new Date(a.Timestamp).getTime();
      const dateB = new Date(b.Timestamp).getTime();
      return dateB - dateA;
    });

    // Filter by type if specified
    if (params.notification_type) {
      notifications = notifications.filter((n) => n.Type === params.notification_type);
    }

    const total = notifications.length;
    const startIndex = (params.page - 1) * params.limit;
    const endIndex = startIndex + params.limit;
    const paginatedNotifications = notifications.slice(startIndex, endIndex);

    return {
      data: paginatedNotifications,
      total,
      page: params.page,
      limit: params.limit,
    };
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw error;
  }
};

/**
 * Get error message from axios error
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || `Server Error: ${error.response.status}`;
    } else if (error.request) {
      return "No response from server. Please check your network connection.";
    }
  }
  return "An unexpected error occurred. Please try again.";
};
