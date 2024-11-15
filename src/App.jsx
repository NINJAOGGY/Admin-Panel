import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard'
import Layout from './components/Layout/Layout';
import Calendar from './pages/Calendar/Calendar';
import BoardPage from './pages/Board/Board';
import DataGrid from './pages/DataGrid/DataGrid';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  // Show loading state while Clerk loads
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div id="dashboard">
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignedOut><SignInPage /></SignedOut>} />
          <Route path="/sign-up" element={<SignedOut><SignUpPage /></SignedOut>} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="board" element={<BoardPage />} />
            <Route path="users" element={<DataGrid />} />
          </Route>

          {/* Redirect all other routes to sign-in */}
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App