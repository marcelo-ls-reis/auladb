import React, { useState } from 'react';

function App() {
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [valor, setValor] = useState('');
    const [criadoPor, setCriadoPor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/produto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ descricao, categoria, valor, criadoPor })
            });
            if (response.ok) {
                const data = await response.json();
                alert(`Produto inserido com sucesso! ID: ${data.id}`);
            } else {
                alert('Erro ao inserir produto.');
            }
        } catch (error) {
            console.error('Erro ao inserir produto:', error);
            alert('Erro ao inserir produto.');
        }
    };

    return (
        <div>
            <h1>Inserir Produto</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="descricao">Descrição:</label><br />
                <input type="text" id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} /><br />
                <label htmlFor="categoria">Categoria:</label><br />
                <input type="text" id="categoria" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} /><br />
                <label htmlFor="valor">Valor:</label><br />
                <input type="number" id="valor" name="valor" value={valor} onChange={(e) => setValor(e.target.value)} /><br />
                <label htmlFor="criadoPor">Criado por:</label><br />
                <input type="text" id="criadoPor" name="criadoPor" value={criadoPor} onChange={(e) => setCriadoPor(e.target.value)} /><br />
                <button type="submit">Inserir</button>
            </form>
        </div>
    );
}

export default App;

