import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { useEffect, useState } from "react";

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  quantity: number;
  available: number;
  isbn: string;
  status: "available" | "out_of_stock" | "discontinued";
}
function App() {

  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);
  return (
    <>
      <Header books={books} setBooks={setBooks}></Header>
      <Body books={books} setBooks={setBooks}></Body>
    </>
  );
}
export default App;
