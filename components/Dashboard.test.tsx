import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';  // Asegúrate de que la ruta de importación sea correcta
import { useUser } from '@supabase/auth-helpers-react';

// Mock de useUser
jest.mock('@supabase/auth-helpers-react', () => ({
  useUser: jest.fn(),
}));

// Mock de los hooks personalizados si los tienes
jest.mock('@/lib/hooks', () => ({
  useClientes: jest.fn(() => ({ clientes: [] })),
  useOportunidades: jest.fn(() => ({ oportunidades: [] })),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    // Configura el mock de useUser para simular un usuario autenticado
    (useUser as jest.Mock).mockReturnValue({ email: 'usuario@ejemplo.com' });
  });

  it('renderiza el saludo y los componentes del dashboard', () => {
    render(<Dashboard />);

    // Verifica el saludo
    expect(screen.getByText(/Bienvenido al Dashboard, usuario@ejemplo.com/i)).toBeInTheDocument();

    // Verifica que se rendericen los componentes principales del dashboard
    expect(screen.getByText('Resumen de Clientes')).toBeInTheDocument();
    expect(screen.getByText('Resumen de Oportunidades')).toBeInTheDocument();
  });

  it('muestra mensaje de inicio de sesión cuando no hay usuario', () => {
    // Simula que no hay usuario autenticado
    (useUser as jest.Mock).mockReturnValue(null);

    render(<Dashboard />);

    expect(screen.getByText('Por favor, inicia sesión para ver el dashboard.')).toBeInTheDocument();
  });
});