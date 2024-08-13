import React, { useState, useEffect } from 'react';
import { Todo } from '../types';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todos';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getTodos();
      setTodos(data);
    })();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      const addedTodo = await addTodo(newTodo);
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = await updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const handleEditTodo = async (id: number, newText: string) => {
    const updatedTodo = await updateTodo(id, { text: newText });
    setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
            onEdit={(newText) => handleEditTodo(todo.id, newText)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
