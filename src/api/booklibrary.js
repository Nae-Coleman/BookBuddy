const API = import.meta.env.VITE_API;

import booksLocal from "../data/books.json";

export async function getBooks() {
  try {
    const res = await fetch(`${API}/books`);

    // If API returns error OR is down
    if (!res.ok) {
      console.warn("API failed, using local fallback");
      return booksLocal;
    }

    return res.json();
  } catch (err) {
    console.warn("API unreachable, using local fallback");
    return booksLocal;
  }
}

export async function getBook(id) {
  try {
    const res = await fetch(`${API}/books/${id}`);

    if (!res.ok) {
      console.warn("API failed, using local fallback");
      return booksLocal.find((b) => b.id === Number(id));
    }

    return res.json();
  } catch (err) {
    console.warn("API unreachable, using local fallback");
    return booksLocal.find((b) => b.id === Number(id));
  }
}
