const BookCard = ({ book, onClick }) => {
    const coverId = book.cover_i;
    const coverUrl = coverId 
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : '/placeholder-cover.jpg';
    
    const authors = book.author_name ? book.author_name.join(', ') : 'Unknown';
    const firstPublishYear = book.first_publish_year || 'Year Unknown';
  
    return (
      <div 
        onClick={onClick}
        className="bg-secondary rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800 cursor-pointer"
      >
        <div className="p-3 h-40 bg-gray-200 dark:bg-gray-400 flex items-center justify-center">
          <img 
            src={coverUrl} 
            alt={`Cover of ${book.title}`}
            className="h-full object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-cover.jpg';
            }}
          />
        </div>
        <div className="p-2">
          <h3 className="font-bold text-lg mb-1 text-white">
            {book.title}
          </h3>
          <p className="text-white dark:text-white text-sm mb-1 line-clamp-2">
            {authors}
          </p>
          <p className="text-white dark:text-gray-400 text-xs">
            Published: {firstPublishYear}
          </p>
        </div>
      </div>
    );
  };
  
  export default BookCard;