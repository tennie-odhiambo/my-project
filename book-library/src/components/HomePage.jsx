import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://openlibrary.org/search.json?q=subject:fiction&limit=12'
        );
        const data = await response.json();
        setBooks(data.docs || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  const searchBooks = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewBookDetails = (book) => {
    const workId = book.key.split('/works/').pop().split('/').pop();
    navigate(`/book/${workId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-mono text-gray-800 dark:text-white ">Book Library</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 text-black bg-gray-400 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      
      <SearchBar 
        query={query}
        setQuery={setQuery}
        onSearch={searchBooks}
      />
      
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
      ) : (
        <>
          <div className="mt-8">
            
            {books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard 
                    key={book.key} 
                    book={book} 
                    onClick={() => viewBookDetails(book)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                No books found. {!query && 'search for something.'}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;