import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setUserData(null);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao tentar fazer login.');
      }

      setUserData(data);
      // Aqui você pode salvar o token (data.token) no localStorage
      // e redirecionar o usuário para uma página protegida.
      console.log('Login bem-sucedido:', data);

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      {userData && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #d4edda', borderRadius: '4px', backgroundColor: '#d4edda', color: '#155724' }}>
          <h3>Login bem-sucedido!</h3>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Usuário:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Token:</strong> {userData.token.substring(0, 30)}...</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;