import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AccountPage = ({ user }) => {
  const [checkedOut, setCheckedOut] = useState([]);

  // Fetch user reservations (your API calls them "checked out books")
  const fetchCheckedOutBooks = async () => {
    try {
      const token = window.localStorage.getItem("token");

      const { data } = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me/reservations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCheckedOut(data);
    } catch (err) {
      console.error("Error loading reservations:", err);
    }
  };

  useEffect(() => {
    fetchCheckedOutBooks();
  }, []);

  //  RETURN BOOK FUNCTION
  const returnBook = async (bookId) => {
    try {
      const token = window.localStorage.getItem("token");

      await axios.put(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}/return`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book returned!");

      // Refresh list
      fetchCheckedOutBooks();
    } catch (err) {
      console.error("Error returning book:", err);
      alert("Could not return book.");
    }
  };

  return (
    <div>
      <h2>My Account</h2>

      {user.id ? (
        <div>
          <h3>Welcome, {user.email}</h3>

          <h4>My Checked Out Books:</h4>
          {checkedOut.length ? (
            checkedOut.map((book) => (
              <div key={book.id} style={{ margin: "1rem 0" }}>
                <p>
                  <p>{book.title}</p>
                </p>
                <NavLink to={`/books/${book.id}`}>View Book</NavLink>
              </div>
            ))
          ) : (
            <p>You have no checked-out books.</p>
          )}
        </div>
      ) : (
        <p>Please log in to view your account.</p>
      )}
    </div>
  );
};

export default AccountPage;
