import SearchBar from "../../components/SearchBar/SearchBar";
import SearchHistory from "../../components/SearchHistory/SearchHistory";
import { useAppContext } from "../../contexts/AppContext";
import styles from "./SearchScreen.module.scss";

const SearchScreen = () => {
  const { searchHistory } = useAppContext();

  return (
    <div className={styles["search"]}>
      <SearchBar />
      {searchHistory.size > 0 && (
        <SearchHistory history={Array.from(searchHistory)} />
      )}
    </div>
  );
};

export default SearchScreen;
