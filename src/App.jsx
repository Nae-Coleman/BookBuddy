import { Routes, Route, Navigate } from "react-router-dom";
import BookList from "./pages/BookList"; // You’ll create this
import BookInfo from "./pages/bookinfo.jsx"; // Book details page
import BookProvider from "./context/BookProvider.jsx";
// context provider

// import AccountPage from "./pages/AccountPage"; // You’ll make this
// import Login from "./auth/Login";
// import Register from "./auth/Register";
import "./pages/List.css";

export default function App() {
  return (
    <>
      <div>
        <h1>
          <img id="logo-image" src="books.png" />
          Library App
        </h1>

        <p>
          Complete the React components needed to allow users to browse a
          library catalog, check out books, review their account, and return
          books that they've finished reading.
        </p>

        <p>
          You may need to use some state in this top-level component in other
          components that need to know if a user has logged in or not.
        </p>

        <p>
          Don't forget to set up React Router to navigate between the different
          views of your single page application!
        </p>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookInfo />} />
        {/* <Route path="/account" element={<AccountPage />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </>
  );
}
