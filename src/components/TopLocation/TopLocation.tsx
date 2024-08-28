import React, { useCallback } from "react";
import { useAppContext } from "../../contexts/AppContext";
import styles from "./TopLocation.module.scss";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as GeoIcon } from "../../assets/geo.svg";

const TopLocation = () => {
  const { setScreen, location } = useAppContext();

  const handleGoBack = useCallback(() => {
    setScreen("search");
  }, [setScreen]);

  return (
    <div className={styles["location"]}>
      <div className={styles["location__container"]}>
        <div>
          <GeoIcon fill="#000" width={30} height={30} />
          <p>{location}</p>
        </div>
        <button onClick={handleGoBack} className={styles["back-button"]}>
          <SearchIcon fill="#000" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default TopLocation;
