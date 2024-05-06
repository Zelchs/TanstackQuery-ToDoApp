import { router } from './routes';
import { RouterProvider } from '@tanstack/react-router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import TodoListPage from './pages/TodoListPage';
// import TodoDetailsPage from './pages/TodoDetailsPage';
// import AddTodoForm from './pages/AddTodoForm';
// import EditTodoForm from './pages/EditTodoForm';

// <Router>
//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item">
//         <Link to="/" className="nav-link">
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/add" className="nav-link">
//           Add Todo
//         </Link>
//       </li>
//     </ul>
//   </nav>

//   <Routes>
//     <Route path="/" element={<TodoListPage />} />
//     <Route path="/todos/:id" element={<TodoDetailsPage />} />
//     <Route path="/add" element={<AddTodoForm />} />
//     <Route path="/edit/todo/:id" element={<EditTodoForm />} />
//   </Routes>
// </Router>
