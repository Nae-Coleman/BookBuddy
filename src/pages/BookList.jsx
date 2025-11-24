import { Link } from "react-router-dom";
import { useBooks } from "../context/BookProvider";
import "./List.css";

export default function BookList() {
  const { books } = useBooks(); // Get books from context

  return (
    <section className="bookCatalog">
      <h1>Book Catalog</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-card">
            <img src={book.coverimage} alt={book.title} />
            <h3 className="book-title">
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </h3>
            <p className="book-author">{book.author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
