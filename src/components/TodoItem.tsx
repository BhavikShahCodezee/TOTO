import React, { useState } from 'react';
import { Todo } from '../types';
import Modal from './Modal';

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    onEdit(editText);
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        )}
      </div>
      <div>
        {isEditing ? (
          <button onClick={handleEditConfirm}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => setShowDeleteModal(true)}>Delete</button>
          </>
        )}
      </div>

      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          content={<p>Are you sure you want to delete this task?</p>}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </li>
  );
};

export default TodoItem;
