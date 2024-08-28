import SearchScreen from "./screens/SearchScreen/SearchScreen";
import WeatherScreen from "./screens/WeatherScreen/WeatherScreen";
import TopLocation from "./components/TopLocation/TopLocation";
import { useAppContext } from "./contexts/AppContext";
import styles from "./App.module.scss";

const App = () => {
  const { isLoading, screen, location } = useAppContext();

  return (
    <div className={styles["app"]}>
      {isLoading && (
        <div className={styles["spinner"]}>
          <span className={styles["spinner__icon"]}></span>
        </div>
      )}
      {location && <TopLocation />}
      <div className={styles["container"]}>
        {screen === "search" ? (
          <SearchScreen />
        ) : (
          <WeatherScreen />
        )}
      </div>
    </div>
  );
};

export default App;
