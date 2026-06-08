import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
        // Default to Delhi if location denied
        setLocation({ latitude: 28.6139, longitude: 77.2090 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { location, error, isLoading };
};

export default useGeoLocation;