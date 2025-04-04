import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import ErrorMessage from '../components/ErrorMessage';
import FavoriteQuote from '../components/FavoriteQuote';

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!bookResponse.ok) throw new Error('Failed to fetch book details');
        
        const bookData = await bookResponse.json();
  
        let authorData = {};
        if (bookData.authors && bookData.authors.length > 0) {
          const authorId = bookData.authors[0].author.key.split('/').pop();
          const authorResponse = await fetch(`https://openlibrary.org/authors/${authorId}.json`);
          if (authorResponse.ok) {
            authorData = await authorResponse.json();
          }
        }
        
        setBook({
          ...bookData,
          authorDetails: authorData,
          covers: bookData.covers || [bookData.cover_id].filter(Boolean)
        });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBookDetails();
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  if (error) return <ErrorMessage message={error} />;
  if (!book) return <p className="text-center mt-8 dark:text-white">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={goBack}
        className="mb-6 px-4 py-2 bg-primary text-black rounded-lg hover:bg-white transition-colors dark:bg-primary dark:hover:bg-white dark:hover:text-secondary"
      >
        Back
      </button>
      
      <BookDetails book={book} />
      <FavoriteQuote bookId={id} />
    </div>
  );
};

export default BookPage;