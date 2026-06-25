import { LogError, LogInfo } from "../../../logging-middleware/index.js";

const BASE_URL = "http://4.224.186.213/evaluation-service";

/**
 * Fetches notifications from the external API.
 * @param {Object} options 
 * @param {number} [options.limit] - Limit number of notifications.
 * @param {number} [options.page] - Page number.
 * @param {string} [options.notification_type] - Filter by type.
 * @returns {Promise<Array>} Array of notification objects.
 */
export async function fetchNotifications(options = {}) {
  const token = import.meta.env.VITE_LOG_AUTH_TOKEN;
  
  try {
    const params = new URLSearchParams();
    if (options.limit) params.append("limit", options.limit);
    if (options.page) params.append("page", options.page);
    if (options.notification_type && options.notification_type !== 'All') {
      params.append("notification_type", options.notification_type);
    }

    const url = `${BASE_URL}/notifications?${params.toString()}`;

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    LogInfo("frontend", "api", `Fetching notifications from ${url}`);

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errText = await response.text();
      LogError("frontend", "api", `API responded with status ${response.status}: ${errText}`);
      throw new Error(`Failed to load notifications: ${response.statusText}`);
    }

    const data = await response.json();
    LogInfo("frontend", "api", `Successfully fetched ${Array.isArray(data) ? data.length : 'data'} notifications`);
    
    // Convert to common frontend shape
    return data.map(item => ({
      id: item.ID,
      type: item.Type,
      message: item.Message,
      createdAt: item.Timestamp
    }));

  } catch (error) {
    LogError("frontend", "api", `Error fetching notifications: ${error.message}`);
    throw error;
  }
}
