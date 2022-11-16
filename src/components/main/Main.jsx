import "./Main.css";
import { useState } from "react";

const Main = () => {
  let [todoName, setTodoName] = useState("");
  const [toggleSearchAdd, setToggleSearchAdd] = useState("search");
  const [label, setLabel] = useState("all");
  let [todoList, setTodoList] = useState([
    { id: 1, todoName: "Learn React", completed: false }, // -> item
    { id: 2, todoName: "Learn JS", completed: true }, // -> item
    { id: 3, todoName: "Learn HTML", completed: false }, // -> item
  ]);
  const [currentTodoList, setCurrentTodoList] = useState([
    { id: 1, todoName: "Learn React", completed: false }, // -> item
    { id: 2, todoName: "Learn JS", completed: true }, // -> item
    { id: 3, todoName: "Learn HTML", completed: false }, // -> item
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit", e.target[0].value);
    // Reactjs degisken degistirme
    // setTodoName(e.target[0].value);
    // JS degisken degistirme
    // todoName = e.target[0].value
    let newTodo = {
      id: new Date().getTime(),
      todoName: e.target[0].value,
      completed: false,
    };
    console.log(newTodo);
    setTodoList([...todoList, newTodo]);
    setCurrentTodoList([...todoList, newTodo]);
    setTodoName("");
  };

  const handleCompleted = (id) => {
    console.log('handleCompleted')
    const newTodoList = todoList.map((item) => {
      if (id === item.id) {
        item.completed = !item.completed;
        return item;
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
    setCurrentTodoList(newTodoList);
  };

  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    console.log('handleDelete', newTodoList)
    setTodoList(newTodoList);
    setCurrentTodoList(newTodoList);
  };

  const handleSearch = (e) => {
    let newList = todoList.filter((item) =>
      item.todoName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCurrentTodoList(newList);
  };

  const handleLabels = (type) => {
    setLabel(type);
    if (type === "active") {
      let activeList = todoList.filter((item) => item.completed === false);
      setCurrentTodoList(activeList);
    }else if (type === 'completed') {
      let completedList = todoList.filter((item) => item.completed === true);
      setCurrentTodoList(completedList);
    }else{
      setCurrentTodoList(todoList);
    }
  };

  return (
    <div className="add-todo">
      {/* 
      if(toggleSearchAdd === "add-todo" )
      add todo form
      elseif(toggleSearchAdd === "search")
      search form
      else
      null
      */}
      {toggleSearchAdd === "add-todo" ? (
        <form onSubmit={handleSubmit}>
          <input
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            type="text"
            placeholder="Add todo"
          />
        </form>
      ) : toggleSearchAdd === "search" ? (
        <div className="search-wrapper">
          <input
            onChange={(e) => handleSearch(e)}
            type="text"
            placeholder="Search"
          />
        </div>
      ) : null}
      <div className="todo-list">
        {currentTodoList.map((item) => (
          <div
            key={item.id}
            className={item.completed ? "completed-todo" : "notcompleted-todo"}
          >
            <p className={item.completed ? "completed-todo-par" : ""}>
              {item.todoName}
            </p>
            <div>
              {item.completed ? (
                <div>
                  <i
                    onClick={() => handleDelete(item.id)}
                    className="ri-close-line"
                  ></i>
                  <i
                    onClick={() => handleCompleted(item.id)}
                    className="ri-checkbox-line"
                  ></i>
                </div>
              ) : (
                <i
                  onClick={() => handleCompleted(item.id)}
                  className="ri-checkbox-blank-line"
                ></i>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="controllers">
        <div className="toggle-search-add">
          <i
            onClick={() => setToggleSearchAdd("add-todo")}
            className="ri-add-line"
          ></i>
          <i
            onClick={() => setToggleSearchAdd("search")}
            className="ri-search-eye-line"
          ></i>
          <div className="counter">{currentTodoList.length} items</div>
        </div>
        <div className="labels">
          <p
            onClick={() => handleLabels("all")}
            className={label === "all" ? "active" : "passive"}
          >
            All
          </p>
          <p
            className={label === "active" ? "active" : "passive"}
            onClick={() => handleLabels("active")}
          >
            Active
          </p>
          <p
            onClick={() => handleLabels("completed")}
            className={label === "completed" ? "active" : "passive"}
          >
            Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
