import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // ✅ Import Navigate
import { AuthContext, AuthProvider } from "./components/AuthContext"; // ✅ Import AuthContext and AuthProvider
import './App.css';
import LoginPage from './components/LoginPage';
import TodoApp from './TodoApp';
import Welcome from './components/Welcome';
import ErrorPage from './components/ErrorPage';
import ListTodo from './components/ListTodo';
import Header from './components/Header';
import Footer from './components/Footer';
import Logout from './components/Logout';
import Home from './components/Home';
import UpdateTodoPage from "./components/UpdateTodoPage";
import TodoComp from "./components/TodoComp";





 function App() {
  function AuthenticatedRoute({ children }) {
    const authContext = useContext(AuthContext);
    return authContext.isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  }
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/todo" element={<TodoApp />} />
            <Route path="/welcome/:username" element={
              <AuthenticatedRoute><Welcome />
              </AuthenticatedRoute>} />
            <Route path="*" element={
              <AuthenticatedRoute><ErrorPage />
              </AuthenticatedRoute>}/>
            <Route path="/todos" element={
              <AuthenticatedRoute><ListTodo />
              </AuthenticatedRoute>} />
            <Route path="/logout" element={
              <AuthenticatedRoute><Logout />
              </AuthenticatedRoute>} />
              <Route path="/todo/:id" element={
              <AuthenticatedRoute><TodoComp />
              </AuthenticatedRoute>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
