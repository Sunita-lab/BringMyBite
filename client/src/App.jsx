import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FoodDetail from "./pages/FoodDetail";
import AdminPanel from "./pages/Admin/index";
import AddFood from "./pages/Admin/AddFood";
import AddCategory from "./pages/Admin/AddCategory";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/food/:id" element={
  <ProtectedRoute>
    <FoodDetail />
  </ProtectedRoute>
} />
<Route path="/admin" element={
  <ProtectedRoute>
    <AdminPanel />
  </ProtectedRoute>
} />
<Route path="/admin/add-food" element={
  <ProtectedRoute>
    <AddFood />
  </ProtectedRoute>
} />
<Route path="/admin/add-category" element={
  <ProtectedRoute>
    <AddCategory />
  </ProtectedRoute>
} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;