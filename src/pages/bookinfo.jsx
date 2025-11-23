import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../context/BookProvider.jsx";

export default function BookInfo() {
  const { id } = useParams();
  const { book, loadBook } = useBooks();

  useEffect(() => {
    loadBook(id);
  }, [id]);

  if (!book.title) return <p>Loading...</p>;

  return (
    <section>
      <h1>{book.title}</h1>
      <img src={book.coverimage} alt={book.title} />

      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>

      {/* Reserve button will go here soon */}
    </section>
  );
}
