import React from 'react';

const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow p-4 mb-2 rounded"
    >
      <div className="flex-1 min-w-0 mb-2 sm:mb-0">
        <p className={`font-bold break-words ${todo.isCompleted ? 'line-through' : ''} whitespace-normal`}>{todo.text}</p>
        <p className="text-gray-600 break-words whitespace-normal">({todo.category})</p>
      </div>
      <div className="flex gap-2 sm:flex-row flex-col sm:items-center sm:ml-4">
        <button
          onClick={() => completeTodo(todo._id)}
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
        >
          Completar
        </button>
        <button
          onClick={() => removeTodo(todo._id)}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
