import type { Book } from "../types/Book";
import axios from "../utils/axiosInstance";

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get("/books");
  return response.data;
};

export const createBook = async (book: Omit<Book, "id">) => {
  await axios.post("/books", book);
};

export const updateBook = async (id: number, book: Omit<Book, "id">) => {
  await axios.put(`/books/${id}`, book);
};

export const deleteBook = async (id: number) => {
  await axios.delete(`/books/${id}`);
};