import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookPage from './components/BookPage';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;