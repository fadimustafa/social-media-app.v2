import { useState, useEffect } from "react";

const useTimeAgo = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!timestamp) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const date = new Date(timestamp);
      const secondsAgo = Math.floor((now - date) / 1000);

      let interval;
      let unit;

      if (secondsAgo < 60) {
        interval = secondsAgo;
        unit = "s";
      } else if (secondsAgo < 3600) {
        // Less than an hour
        interval = Math.floor(secondsAgo / 60);
        unit = "m";
      } else if (secondsAgo < 86400) {
        // Less than a day
        interval = Math.floor(secondsAgo / 3600);
        unit = "h";
      } else {
        // More than a day
        interval = Math.floor(secondsAgo / 86400);
        unit = "d";
      }

      setTimeAgo(`${interval}${unit}`);
    };

    updateTimeAgo();

    // Optionally update the time ago string every minute
    const intervalId = setInterval(updateTimeAgo, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return timeAgo;
};

export default useTimeAgo;
