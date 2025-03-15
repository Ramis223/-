import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import MastersList from './components/MastersList';
import ServicesList from './components/ServicesList';
import CreateOrder from './components/CreateOrder';
import UserOrders from './components/UserOrders';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CreateMaster from './components/admin/CreateMaster';
import ManageMasters from './components/admin/ManageMasters';
import UpdateMaster from './components/admin/UpdateMaster';
import CreateService from './components/admin/CreateService';
import ManageServices from './components/admin/ManageServices';
import UpdateService from './components/admin/UpdateService';
import SearchClients from './components/admin/SearchClients';
import ManageClients from './components/admin/ManageClients'; // Новый компонент
import UpdateClient from './components/admin/UpdateClient'; // Новый компонент
import ManageOrders from './components/admin/ManageOrders'; // Новый компонент

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/masters" element={<MastersList />} />
        <Route path="/services" element={<ServicesList />} />
        <Route
          path="/create-order"
          element={
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-master"
          element={
            <ProtectedRoute>
              <CreateMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/masters"
          element={
            <ProtectedRoute>
              <ManageMasters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-master/:id"
          element={
            <ProtectedRoute>
              <UpdateMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-service"
          element={
            <ProtectedRoute>
              <CreateService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <ManageServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-service/:id"
          element={
            <ProtectedRoute>
              <UpdateService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/search-clients"
          element={
            <ProtectedRoute>
              <SearchClients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <ProtectedRoute>
              <ManageClients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-client/:id"
          element={
            <ProtectedRoute>
              <UpdateClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <ManageOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;