import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    // Event handler functions
    const handleOnline = () => {
      setOnlineStatus(true);
    };

    const handleOffline = () => {
      setOnlineStatus(false);
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // Empty dependency array means this runs only once on mount

  return onlineStatus;
};

export default useOnlineStatus;
