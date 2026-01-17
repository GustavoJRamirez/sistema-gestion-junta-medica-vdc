import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Cargando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <LoginPage />
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />

      {/* Redirect root to dashboard (which will redirect to login if not auth) */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
