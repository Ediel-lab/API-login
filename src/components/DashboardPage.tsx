import React, { useState, useEffect } from 'react';

// 1. Definindo as interfaces para os nossos dados
// (OBS: A estrutura real dependerá da resposta da API da Shopee)
interface Venda {
  id: string;
  produto: string;
  valor: number;
  data: string;
}

interface EstatisticasAcesso {
  visitasHoje: number;
  totalVendasMes: number;
  taxaConversao: string;
}

const DashboardPage: React.FC = () => {
  // 2. Estados para guardar os dados, loading e erros
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasAcesso | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 3. AQUI SERIA A CHAMADA PARA O SEU BACK-END!
        // O seu back-end, por sua vez, chamaria a API da Shopee.
        // Vamos simular com dados falsos e um delay.
        
        // Exemplo de chamada real:
        // const responseVendas = await fetch('/api/shopee/vendas');
        // const dataVendas = await responseVendas.json();
        // setVendas(dataVendas);

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulando delay da rede

        // Dados Falsos para Simulação
        const fakeVendas: Venda[] = [
          { id: 'BR2509A', produto: 'Fone de Ouvido Bluetooth', valor: 89.90, data: '2025-09-24' },
          { id: 'BR2509B', produto: 'Capa para Celular', valor: 25.00, data: '2025-09-24' },
          { id: 'BR2509C', produto: 'Teclado Mecânico Gamer', valor: 250.50, data: '2025-09-23' },
        ];
        const fakeEstatisticas: EstatisticasAcesso = {
          visitasHoje: 142,
          totalVendasMes: 32,
          taxaConversao: '22.5%',
        };

        setVendas(fakeVendas);
        setEstatisticas(fakeEstatisticas);

      } catch (err) {
        setError('Falha ao buscar os dados da Shopee. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio faz com que o useEffect rode apenas uma vez

  // 4. Renderização condicional (Loading, Erro, Dados)
  if (loading) {
    return <div style={styles.container}><h2>Carregando dados da Shopee...</h2></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div style={styles.container}>
      <h2>Seu Dashboard Shopee</h2>
      
      {/* Seção de Estatísticas */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Visitas Hoje</h3>
          <p style={styles.statNumber}>{estatisticas?.visitasHoje}</p>
        </div>
        <div style={styles.card}>
          <h3>Vendas no Mês</h3>
          <p style={styles.statNumber}>{estatisticas?.totalVendasMes}</p>
        </div>
        <div style={styles.card}>
          <h3>Taxa de Conversão</h3>
          <p style={styles.statNumber}>{estatisticas?.taxaConversao}</p>
        </div>
      </div>

      {/* Seção de Vendas Recentes */}
      <h3 style={{ marginTop: '40px' }}>Vendas Recentes</h3>
      <ul style={styles.list}>
        {vendas.map(venda => (
          <li key={venda.id} style={styles.listItem}>
            <span>{venda.produto}</span>
            <span>R$ {venda.valor.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Estilos simples para manter a consistência
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'sans-serif'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statNumber: {
    fontSize: '2em',
    fontWeight: 'bold',
    margin: '10px 0 0 0'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #eee'
  }
};

export default DashboardPage;