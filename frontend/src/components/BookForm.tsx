import { useState } from "react";
import { createBook, updateBook } from "../services/bookService";
import type { Book } from "../types/Book";

interface Props {
  book?: Book;
  onSuccess: () => void;
}

const BookForm = ({ book, onSuccess }: Props) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [description, setDescription] = useState(book?.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (book) {
      await updateBook(book.id, { title, author, description });
    } else {
      await createBook({ title, author, description });
    }

    setTitle("");
    setAuthor("");
    setDescription("");

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-4"
    >
      <h3 className="text-xl font-bold mb-3 text-gray-600">
        {book ? "Edit Book" : "Add Book"}
      </h3>

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 mb-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {book ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default BookForm;