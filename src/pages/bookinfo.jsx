import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../context/BookProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookInfo({ user }) {
  const { id } = useParams();
  const { book, loadBook } = useBooks();

  const navigate = useNavigate();

  useEffect(() => {
    loadBook(id);
  }, [id]);

  const reserveBook = async () => {
    try {
      const token = window.localStorage.getItem("token");

      const { data } = await axios.post(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}/reserve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Reserved!");
      navigate("/account");
    } catch (error) {
      console.error("Reservation failed:", error);
      alert("Could not reserve this book.");
    }
  };

  if (!book.title) return <p>Loading...</p>;

  return (
    <section>
      <h1>{book.title}</h1>
      <img src={book.coverimage} alt={book.title} />

      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>

      {/* Reserve Button */}
      {!user.id ? (
        <p>You must be logged in to reserve this book.</p>
      ) : book.available ? (
        <button onClick={reserveBook}>Reserve Book</button>
      ) : (
        <button disabled style={{ opacity: 0.5 }}>
          Not Available
        </button>
      )}
    </section>
  );
}
