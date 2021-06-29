import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getRoles("https://assets.breatheco.de/apis/fake/todos/user/anna");
  }, []);
  const getRoles = (url, options = {}) => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTodos(data);
        console.log(todos);
      });
  };
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };
  function actualizarFetch() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/anna", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        getRoles("https://assets.breatheco.de/apis/fake/todos/user/anna");
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }

  const removeTodo = id => {
      const removeArr = [...todos].filter(todo=>todo.id !== id)

      setTodos(removeArr);
  }
  const completeTodo = (id) => {
    let updatedTodo = todos.map((todo) => {
      if (todo.id == id) {
        todo.isComplete = !todo.iscomplete;
      }
      return todo;
    });
    setTodos(updatedTodo);
  };


  return (
    <div>
        <h1 className="text-center text-danger display-1">Todos</h1>
        <div className="p-5 todosApp">
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo}/>
      </div>
    </div>
  );
}

export default TodoList;
