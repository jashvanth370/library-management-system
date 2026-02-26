import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import type { Book } from "../types/Book";
import BookForm from "../components/BookForm";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | undefined>();

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
    setEditingBook(undefined);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-4 text-center text-gray-600">
          Book Management
        </h1>

        <BookForm book={editingBook} onSuccess={loadBooks} />

        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded shadow mb-3"
          >
            <h2 className="text-xl font-bold">{book.title}</h2>

            <p className="text-gray-600">{book.author}</p>

            <p className="text-gray-500">{book.description}</p>

            <div className="mt-2 space-x-3">
              <button
                onClick={() => setEditingBook(book)}
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(book.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default BooksPage;