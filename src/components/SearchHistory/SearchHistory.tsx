import styles from "./SearchHistory.module.scss";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";
import { SearchHistoryProps } from "./SearchHistory.types";
import { useAppContext } from "../../contexts/AppContext";

const SearchHistory = ({ history }: SearchHistoryProps) => {
  const { handleSearchHistoryDelete, handleSearchHistorySelect } = useAppContext();

  const recentHistory = history.slice(0, 10);

  return (
    <div className={styles["history"]}>
      <p className={styles["history__title"]}>Search History</p>
      <ul className={styles["history__list"]}>
        {recentHistory.map((item, index) => (
          <li key={item} className={styles["history__item"]}>
            <span>{item}</span>
            <div>
              <button
                onClick={() => handleSearchHistorySelect(item)}
                className={styles["history__item-select"]}
              >
                <SearchIcon fill="#000" width={20} height={20} />
              </button>
              <button
                onClick={() => handleSearchHistoryDelete(item)}
                className={styles["history__item-delete"]}
              >
                <TrashIcon fill="#fff" width={20} height={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
