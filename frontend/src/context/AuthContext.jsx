import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // No persistir sesión - siempre empezar sin usuario
        setLoading(false);
    }, []);

    const login = async (role) => {
        // Mock login for demo purposes
        // In a real app, this would call the backend API

        // Mapping roles to demo users
        const demoUsers = {
            administrativo: {
                id: 'u1',
                nombre: 'Admin Usuario',
                email: 'admin@vdc.com',
                role: 'administrativo',
                permissions: ['all']
            },
            medico_evaluador: {
                id: 'u2',
                nombre: 'Dr. Evaluador',
                email: 'medico@vdc.com',
                role: 'medico_evaluador',
                matricula: 'MN-12345',
                permissions: ['junta.create', 'junta.read_own']
            },
            director_medico: {
                id: 'u3',
                nombre: 'Dr. Director',
                email: 'director@vdc.com',
                role: 'director_medico',
                matricula: 'MN-99999',
                permissions: ['junta.review', 'junta.read_all']
            },
            rrhh: {
                id: 'u4',
                nombre: 'Recursos Humanos',
                email: 'rrhh@vdc.com',
                role: 'rrhh',
                permissions: ['junta.read_anon', 'report.export']
            },
            gerencial: {
                id: 'u5',
                nombre: 'Gerencia General',
                email: 'gerencia@vdc.com',
                role: 'gerencial',
                permissions: ['metrics.read']
            }
        };

        const mockUser = demoUsers[role];

        if (mockUser) {
            setUser(mockUser);
            // No guardar en localStorage para que siempre pida login
            return { success: true };
        } else {
            return { success: false, error: 'Rol no válido para demo' };
        }
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
