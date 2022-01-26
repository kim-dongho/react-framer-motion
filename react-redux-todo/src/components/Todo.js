import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      text: todo,
      isComplete: false,
    };

    setTodoList([...todoList].concat(newTodo));
    setTodo('');
  };

  const deleteTodo = (id) => {
    const updateTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(updateTodo);
  };

  const editTodo = (id) => {
    const updateTodo = [...todoList].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodoList(updateTodo);
    setIsEditing(null);
    setEditingText('');
  };

  return (
    <div>
      <h1>ToDo</h1>
      <form onSubmit={onSubmit}>
        <input type='text' value={todo} onChange={onChange} />
        <button>ADD</button>
      </form>
      {todoList.map((todo) => (
        <div key={todo.id}>
          {isEditing === todo.id ? (
            <>
              <input type='text' onChange={(e) => setEditingText(e.target.value)} value={editingText} />
              <button onClick={() => editTodo(todo.id)}>Submit</button>
            </>
          ) : (
            <div>
              {todo.text}
              <MdOutlineCancel onClick={() => deleteTodo(todo.id)} />
              <BiPencil onClick={() => setIsEditing(todo.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
