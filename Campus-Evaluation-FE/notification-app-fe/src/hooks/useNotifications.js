import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { LogDebug, LogError } from "../../../logging-middleware/index.js";

export function useNotifications(options = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We stringify options to avoid infinite loops if it's recreated on every render
  const optionsStr = JSON.stringify(options);

  useEffect(() => {
    let mounted = true;
    
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        LogDebug("frontend", "hook", `useNotifications loading with options: ${optionsStr}`);
        
        const data = await fetchNotifications(JSON.parse(optionsStr));
        if (mounted) {
          setNotifications(data || []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          LogError("frontend", "hook", `useNotifications error: ${err.message}`);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [optionsStr]);

  return { notifications, loading, error };
}
