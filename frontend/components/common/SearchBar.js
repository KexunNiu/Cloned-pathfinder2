import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


/**
 * A simple search bar component
 */
const SearchBar = ({ setSearch }) => {

  // Prevents searchbar to refresh on pressing enter
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form className="flex items-center w-1/2 mx-auto mb-4 shadow-md" onSubmit={handleSubmit}>
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        {/* bootstrap search bar without outline */}
        <input
          type="text"
          id="search"
          className="text-sm rounded-lg block w-full pl-10 p-2.5 active:outline-none focus:outline-secondary"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
