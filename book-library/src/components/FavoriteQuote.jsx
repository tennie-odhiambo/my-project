import { useState } from 'react';

const FavoriteQuote = ({ bookId }) => {
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem(`quotes-${bookId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [newQuote, setNewQuote] = useState('');
  const [pageNumber, setPageNumber] = useState('');

  const addQuote = () => {
    if (!newQuote.trim()) return;
    
    const updatedQuotes = [
      ...quotes,
      {
        text: newQuote,
        page: pageNumber,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      }
    ];
    
    setQuotes(updatedQuotes);
    localStorage.setItem(`quotes-${bookId}`, JSON.stringify(updatedQuotes));
    setNewQuote('');
    setPageNumber('');
  };

  const removeQuote = (id) => {
    const updatedQuotes = quotes.filter(quote => quote.id !== id);
    setQuotes(updatedQuotes);
    localStorage.setItem(`quotes-${bookId}`, JSON.stringify(updatedQuotes));
  };

  return (
    <div className="mt-8 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Favorite Quotes
      </h3>
      
      <div className="mb-6">
        <textarea
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="Add your favorite quote"
          className="w-full p-5 border border-gray-300 rounded-lg mb-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          rows={3}
        />
        <div className="flex gap-4">
          <button
            onClick={addQuote}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Quote
          </button>
        </div>
      </div>
      
      {quotes.length > 0 ? (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div 
              key={quote.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-800 dark:text-gray-200 italic">"{quote.text}"</p>
                  {quote.page && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Page {quote.page}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeQuote(quote.id)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Added on {quote.date}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          Add your favorite quote!
        </p>
      )}
    </div>
  );
};

export default FavoriteQuote;