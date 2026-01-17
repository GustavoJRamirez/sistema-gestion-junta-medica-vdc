import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewJuntaPage from './pages/NewJuntaPage';
import JuntasListPage from './pages/JuntasListPage';
import PatientsPage from './pages/PatientsPage';

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
        user ? <Navigate to="/juntas/new" replace /> : <LoginPage />
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Navigate to="/juntas/new" replace />
        </ProtectedRoute>
      } />

      <Route path="/juntas/new" element={
        <ProtectedRoute>
          <NewJuntaPage />
        </ProtectedRoute>
      } />

      <Route path="/juntas" element={
        <ProtectedRoute>
          <JuntasListPage />
        </ProtectedRoute>
      } />

      <Route path="/patients" element={
        <ProtectedRoute>
          <PatientsPage />
        </ProtectedRoute>
      } />


      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
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
