const API = import.meta.env.VITE_API;

export async function getBooks() {
  const res = await fetch(`${API}/books`);
  return res.json();
}

export async function getBook(id) {
  const res = await fetch(`${API}/books/${id}`);
  return res.json();
}
