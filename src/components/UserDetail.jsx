import { useEffect, useState, useContext, useRef } from "react";

import { UserContext } from "../store/UserContext";
import { GeolocationContext } from "../store/geolocationContext";

import CustomInput from "./CustomInput";
import GeolocationFetcher from "./GeolocationFetcher";

import "../styles/components/UserDetail.scss";

// COMPONENT FUNCTION
export default function UserDetail() {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const { setAlreadyFetched } = useContext(GeolocationContext);

  const [loadingDB, setLoadingDB] = useState(true); // for initial render and waiting for the useeffect hook
  const [isEditing, setIsEditing] = useState(false);

  // HOOK
  useEffect(() => {
    setLoadingDB(false);
  }, []);

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
        {loadingDB && <p className="user-detail__loader">Fetching DB...</p>}
        {!loadingDB && (
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

        <GeolocationFetcher address={loggedUser.address} />
      </div>

      <button className="user-detail__btn" onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}
