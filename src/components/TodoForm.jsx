import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!value || !category) return;
    addTodo(value, category);
    
    setValue("");
    setCategory("");
  };

  return (
    <div className="mb-5">
      <h2 className="font-bold mb-4">Criar tarefa:</h2>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Digite o Título"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Selecione uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
          <option value="Passa-Tempo">Passa-Tempo</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Criar Tarefa
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
