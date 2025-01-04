import { useEffect, useState, useContext, useRef } from "react";

import { UserContext } from "../store/UserContext";
import { GeolocationContext } from "../store/geolocationContext";
import CustomInput from "./CustomInput";

import "../styles/components/UserDetail.scss";

// COMPONENT FUNCTION
export default function UserDetail() {
  const { loggedUser, setLoggedUser, googleApiKey, googleBaseUrl } =
    useContext(UserContext);
  const {
    geolocation,
    setGeolocation,
    alreadyFetched,
    setAlreadyFetched,
    geolocationError,
    setGeolocationError,
  } = useContext(GeolocationContext);

  const [fetchingState, setFetchingState] = useState({
    db: true,
    geolocation: false,
  }); // for initial render and waiting for the useeffect hook
  const [isEditing, setIsEditing] = useState(false);

  // HOOK
  useEffect(() => {
    setFetchingState((prevState) => ({
      ...prevState,
      db: false,
    }));
  }, []);

  useEffect(() => {
    if (loggedUser.address && !alreadyFetched) {
      setFetchingState((prevState) => ({
        ...prevState,
        geolocation: true,
      }));
      async function fetchUserAddress() {
        try {
          if (!googleBaseUrl && !googleApiKey) {
            throw new Error("Missing API .env file");
          }

          const result = await fetch(
            `${googleBaseUrl}?q=${encodeURIComponent(
              loggedUser.address
            )}&limit=1&appid=${googleApiKey}`
          );

          const data = await result.json();

          if (!data.length) {
            throw new Error("Failed to fetch location, try another format");
          }

          setGeolocation({ lat: data[0].lat, lon: data[0].lon });
          setGeolocationError(null);
          setAlreadyFetched(true);
        } catch (error) {
          setGeolocationError(error.message);
        } finally {
          setFetchingState((prevState) => ({
            ...prevState,
            geolocation: false,
          }));
          false;
        }
      }

      fetchUserAddress();
    }
  }, [
    alreadyFetched,
    googleApiKey,
    googleBaseUrl,
    loggedUser.address,
    setAlreadyFetched,
    setGeolocation,
    setGeolocationError,
  ]);

  // REFS - UNCONTROLLED INPUTS
  const nameInput = useRef();
  const addressInput = useRef();

  // FUNCTION
  function handleEdit() {
    setIsEditing((prevState) => !prevState);

    if (isEditing) {
      setLoggedUser((prevData) => {
        const newData = {
          ...prevData,
          name: nameInput.current.value,
          address: addressInput.current.value,
        };

        if (prevData.address !== newData.address) {
          setAlreadyFetched(false);
        }

        return newData;
      });
    }
  }

  // JSX
  return (
    <div className="user-detail">
      <div className="user-detail__content">
        {fetchingState.db && (
          <p className="user-detail__loader">Fetching DB...</p>
        )}
        {!fetchingState.db && (
          <div className="user-detail__fields">
            <CustomInput
              ref={nameInput}
              defaultValue={loggedUser.name}
              disabled={!isEditing}
              label="Username"
            />
            <CustomInput
              ref={addressInput}
              defaultValue={loggedUser.address}
              disabled={!isEditing}
              label="Address"
            />
          </div>
        )}

        {fetchingState.geolocation && (
          <p className="user-detail__loader">Fetching Geolocation...</p>
        )}

        {!fetchingState.geolocation && !geolocationError && geolocation && (
          <div className="user-detail__geolocation-content">
            <span>{`Latitude:  ${geolocation.lat}`}</span>
            <span>{`Longitude:  ${geolocation.lon}`}</span>
          </div>
        )}

        {!fetchingState.geolocation && geolocationError && (
          <div>
            <p className="user-detail__geolocation-error">{geolocationError}</p>
          </div>
        )}
      </div>

      <button className="user-detail__btn" onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}
