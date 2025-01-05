import { useEffect, useState, useContext } from "react";
import { GeolocationContext } from "../store/geolocationContext";
import { UserContext } from "../store/UserContext";

import "../styles/components/GeolocationFetcher.scss";

export default function GeolocationFetcher({ address }) {
  const { googleApiKey, googleBaseUrl } = useContext(UserContext);
  const {
    geolocation,
    setGeolocation,
    alreadyFetched,
    setAlreadyFetched,
    geolocationError,
    setGeolocationError,
  } = useContext(GeolocationContext);

  const [fetchingGeoData, setFetchingGeoData] = useState(false);

  useEffect(() => {
    if (address && !alreadyFetched) {
      setFetchingGeoData(true);
      async function fetchGeolocation() {
        try {
          if (!googleBaseUrl || !googleApiKey) {
            throw new Error("Missing API .env file");
          }

          const result = await fetch(
            `${googleBaseUrl}?q=${encodeURIComponent(
              address
            )}&limit=1&appid=${googleApiKey}`
          );

          const data = await result.json();

          if (!data.length) {
            throw new Error(
              "Failed to fetch location, try another location and format"
            );
          }

          setGeolocation({ lat: data[0].lat, lon: data[0].lon });
          setGeolocationError(null);
          setAlreadyFetched(true);
        } catch (error) {
          setGeolocationError(error.message);
        } finally {
          setFetchingGeoData(false);
        }
      }

      fetchGeolocation();
    }
  }, [
    address,
    alreadyFetched,
    googleApiKey,
    googleBaseUrl,
    setGeolocation,
    setGeolocationError,
    setAlreadyFetched,
  ]);

  function renderContent() {
    if (fetchingGeoData) {
      // too fast, throtle to see
      return (
        <p className="geolocation-fetcher__loader">Fetching Geolocation...</p>
      );
    }

    if (geolocationError) {
      return (
        <div className="geolocation-fetcher__error">
          <p className="geolocation-fetcher__error-text">{geolocationError}</p>
        </div>
      );
    }

    if (geolocation) {
      return (
        <div className="geolocation-fetcher__data-container">
          <span>{`Latitude:  ${geolocation.lat}`}</span>
          <span>{`Longitude:  ${geolocation.lon}`}</span>
        </div>
      );
    }

    return null;
  }

  return <div className="geolocation-fetcher">{renderContent()}</div>;
}
