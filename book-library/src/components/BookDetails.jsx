const BookDetails = ({ book }) => {
    const coverId = book.covers ? book.covers[0] : null;
    const coverUrl = coverId 
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : '/placeholder-cover.jpg';
    
    const authors = book.authors?.map(author => author.name).join(', ') || 'Unknown';
    const publishDate = book.publish_date || book.first_publish_date || 'Unknown';
    const description = typeof book.description === 'string' 
      ? book.description 
      : book.description?.value || 'No description available';
    
    const pages = book.number_of_pages || 'Unknown';
  
    return (
    <div>
      <div className="container mx-auto px-4 py-8 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Book Details</h2>
        <div className="md:flex">
          <div className="md:w-1/3 p-6 flex justify-center">
            <img 
              src={coverUrl} 
              alt={`Cover of ${book.title}`}
              className="max-h-96 object-contain rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = '/placeholder-cover.jpg';
              }}
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {book.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              by {authors}
            </p>
            
            <div className="text-black prose dark:prose-invert dark:text-white max-w-none mb-6">
              <p>{description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Publication Date</h3>
                <p className="text-gray-600 dark:text-gray-400">{publishDate}</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Pages</h3>
                <p className="text-gray-600 dark:text-gray-400">{pages}</p>
              </div>
              
              {book.isbn && (
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">ISBN</h3>
                  <p className="text-gray-600 dark:text-gray-400">{book.isbn[0]}</p>
                </div>
              )}
              
              {book.publishers && (
                <div>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Publisher</h3>
                  <p className="text-gray-600 dark:text-gray-400">{book.publishers[0]}</p>
                </div>
              )}
            </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BookDetails;