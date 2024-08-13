import React from 'react';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleEdit = () => {
    const newText = prompt('Edit your task:', todo.text);
    if (newText) onEdit(newText);
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
