import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./redux/Todo/todoSlice";

function App() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-pink-500 text-white text-3xl font-bold py-4 px-8 rounded-md shadow-md">
        Todo App
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md bg-white rounded-lg shadow-lg mt-8 p-6">
        {/* Input Section */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            className="bg-orange-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => {
              if (newTodo.trim() !== "") {
                dispatch(addTodo({ id: Date.now(), text: newTodo }));
                setNewTodo("");
              }
            }}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow-sm"
            >
              {editId === todo.id ? (
                <input
                  type="text"
                  className="border px-2 py-1 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className="text-gray-800">{todo.text}</span>
              )}
              <div className="flex space-x-2">
                {editId === todo.id ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-sm"
                    onClick={() => {
                      dispatch(editTodo({ id: todo.id, text: editText }));
                      setEditId(null);
                      setEditText("");
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-sm"
                    onClick={() => {
                      setEditId(todo.id);
                      setEditText(todo.text);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
