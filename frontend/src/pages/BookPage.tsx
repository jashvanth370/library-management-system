import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import type { Book } from "../types/Book";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Books</h1>

      {books.map((book) => (
        <div
          key={book.id}
          className="border p-4 mb-3 rounded shadow"
        >
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p>{book.author}</p>
          <button
            onClick={() => handleDelete(book.id)}
            className="text-red-500 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BooksPage;