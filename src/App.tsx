import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage'; // Certifique-se de que este componente existe
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para a página de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota para a página de dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Rota padrão: redireciona para /login se o usuário abrir a raiz do site */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;