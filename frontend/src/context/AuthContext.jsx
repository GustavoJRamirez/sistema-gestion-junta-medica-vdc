import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user in localStorage on mount
        const storedUser = localStorage.getItem('vdc_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('vdc_user');
            }
        }
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
            localStorage.setItem('vdc_user', JSON.stringify(mockUser));
            return { success: true };
        } else {
            return { success: false, error: 'Rol no válido para demo' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('vdc_user');
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
