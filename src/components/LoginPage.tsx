import React, { useState } from 'react';
// 1. Importe o hook useNavigate
import { useNavigate } from 'react-router-dom';

// ... (sua interface User, se tiver)
interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  // ... outras propriedades
}

const LoginPage: React.FC = () => {
  // 2. Inicialize o hook
  const navigate = useNavigate(); 
  
  const [username, setUsername] = useState('kminchelle'); // Usuário de teste para facilitar
  const [password, setPassword] = useState('0lelplR');    // Senha de teste para facilitar
  const [error, setError] = useState<string | null>(null);
  // Removido o estado userData, pois vamos redirecionar em vez de mostrar os dados aqui
  // const [userData, setUserData] = useState<User | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data: User = await response.json();

      if (!response.ok) {
        // A API dummyjson retorna 'message' no corpo do erro
        throw new Error((data as any).message || 'Erro ao tentar fazer login.');
      }

      // --- A MÁGICA ACONTECE AQUI ---
      console.log('Login bem-sucedido:', data);

      // 3. Salve o token no localStorage para uso futuro (ex: em uma API real)
      // O localStorage persiste os dados mesmo depois de fechar o navegador.
      localStorage.setItem('userToken', data.token);

      // 4. Redirecione o usuário para a página de dashboard
      navigate('/dashboard');

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    // ... seu JSX do formulário de login continua o mesmo ...
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* ... inputs de usuário e senha ... */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Usuário:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}/>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {/* Mensagem de erro (ex: 'Invalid credentials') */}
      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;