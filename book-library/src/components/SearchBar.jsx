const SearchBar = ({ query, setQuery, onSearch, onKeyPress }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Search books"
        className="flex-grow px-5 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-700"
      />
      <button
        onClick={onSearch}
        className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-secondary hover:text-white transition-colors dark:bg-primary dark:hover:bg-white dark:hover:text-secondary"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;