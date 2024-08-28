import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { useAppContext } from "../../contexts/AppContext";

const SearchBar = () => {
  const { handleSearch, errorMessage, location } = useAppContext();
  const [searchResults, setSearchResults] = useState<string>(location);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchResults(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchResults);
  };

  useEffect(() => {
    setSearchResults(location);
  }, [location]);

  return (
    <div className={styles["searchbar"]}>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="location"
          type="text"
          placeholder="Search country or city here..."
          autoComplete="off"
          value={searchResults}
        />
        <button
          className={styles["search"]}
          type="submit"
          aria-label="search weather"
        >
          <span>Search</span>
        </button>
      </form>
      {errorMessage && <p className={styles["error"]}>{errorMessage}</p>}
    </div>
  );
};

export default SearchBar;
