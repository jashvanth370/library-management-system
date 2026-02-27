import { useState, useEffect } from "react";
import { createBook, updateBook } from "../services/bookService";
import type { Book } from "../types/Book";

interface Props {
  book?: Book;
  onSuccess: () => void;
  onCancel?: () => void;
}

const BookForm = ({ book, onSuccess, onCancel }: Props) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [description, setDescription] = useState(book?.description || "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Keep form in sync when editing a new book
  useEffect(() => {
    setTitle(book?.title || "");
    setAuthor(book?.author || "");
    setDescription(book?.description || "");
    setError(null);
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (book) {
        await updateBook(book.id, { title, author, description });
      } else {
        await createBook({ title, author, description });
      }

      setTitle("");
      setAuthor("");
      setDescription("");

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to complete action.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setError(null);
    if (onCancel) onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-5xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col relative"
    >
      <div className="mb-6 border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold leading-tight text-slate-800">
          {book ? "Edit Book details" : "Add a new Book"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {book ? "Updating your existing book collection." : "Grow your library."}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 mb-4 rounded-xl text-sm border border-red-100 font-medium">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Title</label>
          <input
            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium text-slate-800"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Author</label>
          <input
            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium text-slate-800"
            placeholder="Enter Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Description</label>
          <textarea
            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium text-slate-800 min-h-[100px] resize-y"
            placeholder="A short summary of the book..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-indigo-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            book ? "Save Changes" : "Create Book"
          )}
        </button>

        {book && !isLoading && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-none bg-slate-100 text-slate-600 font-semibold px-4 py-3 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;