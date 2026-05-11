import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Products from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import DeleteProduct from "./pages/DeleteProduct";
import AdminOrders from "./pages/AdminOrders";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Products />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/update-product"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/delete-product"
          element={
            <AdminRoute>
              <DeleteProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

      </Routes>

      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;