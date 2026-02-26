import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import BooksPage from './pages/BookPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <BooksPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
