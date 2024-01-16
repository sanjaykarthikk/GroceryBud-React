import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckAll } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import "./colours.css";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllTodosSelected, setIsAllTodosSelected] = useState(false);
  const [isAllCompletedSelected, setIsAllCompletedSelected] = useState(false);

  const handleAllComplete = () => {
    const now = new Date();
    const completedOn = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;

    const checkedTodos = allTodos.filter((todo) => todo.isChecked);

    setCompletedTodos((prevCompletedTodos) => [
      ...prevCompletedTodos,
      ...checkedTodos.map((todo) => ({
        ...todo,
        completedOn,
        isChecked: false,
      })),
    ]);

    setAllTodos((prevAllTodos) =>
      prevAllTodos.filter((todo) => !todo.isChecked)
    );

    localStorage.setItem(
      "todolist",
      JSON.stringify(allTodos.filter((todo) => !todo.isChecked))
    );
    localStorage.setItem(
      "completedTodos",
      JSON.stringify([
        ...completedTodos,
        ...checkedTodos.map((todo) => ({
          ...todo,
          completedOn,
          isChecked: false,
        })),
      ])
    );

    setIsAllTodosSelected(false);
  };

  const handleCheck = (index) => {
    let todos = [...allTodos];
    todos[index].isChecked = !todos[index].isChecked;
    setAllTodos(todos);
  };

  const handleCheckCompleted = (index) => {
    let completed_todos = [...completedTodos];
    completed_todos[index].isChecked = !completed_todos[index].isChecked;
    setCompletedTodos(completed_todos);
  };

  const handleSelectAllTodos = () => {
    let updatedTodos = allTodos.map((todo) => {
      return { ...todo, isChecked: !isAllTodosSelected };
    });
    setAllTodos(updatedTodos);
    setIsAllTodosSelected(!isAllTodosSelected);
  };

  const handleSelectAllCompleted = () => {
    let updatedCompletedTodos = completedTodos.map((todo) => {
      return { ...todo, isChecked: !isAllCompletedSelected };
    });
    setCompletedTodos(updatedCompletedTodos);
    setIsAllCompletedSelected(!isAllCompletedSelected);
  };

  const handleSort = (e) => {
    const sortMethod = e.target.value;

    let sortedTodos;

    switch (sortMethod) {
      case "az":
        sortedTodos = [...allTodos].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "za":
        sortedTodos = [...allTodos].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      default:
        sortedTodos = [...allTodos];
        break;
    }

    setAllTodos(sortedTodos);
  };

  const handleEditTodo = (index) => {
    const newTitle = window.prompt("Please enter new To-Do title");
    if (newTitle) {
      let editedTodos = [...allTodos];
      editedTodos[index].title = newTitle;
      setAllTodos(editedTodos);
      localStorage.setItem("todolist", JSON.stringify(editedTodos));
    }
  };

  const handleDeleteChecked = () => {
    setAllTodos(allTodos.filter((todo) => !todo.isChecked));
    //well as completedTodos if you have select feature in completed todos as well
    setCompletedTodos(completedTodos.filter((todo) => !todo.isChecked));
    localStorage.setItem(
      "todolist",
      JSON.stringify(allTodos.filter((todo) => !todo.isChecked))
    );
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(completedTodos.filter((todo) => !todo.isChecked))
    );
  };

  const handleCheckboxChange = (e, todo) => {
    const checked = e.target.checked;
    // if checkbox is checked and isn't in the array, add it to `checkedItems` array
    if (checked && !checkedItems.includes(todo)) {
      setCheckedItems([...checkedItems, todo]);
    }
    // if checkbox is not checked and is in the array, remove it from array
    if (!checked && checkedItems.includes(todo)) {
      setCheckedItems(checkedItems.filter((item) => item !== todo));
    }
  };

  const handleAddNewToDo = (e) => {
    e.preventDefault(); // This stops the form from causing a page refresh

    // check if input is empty
    if (!newTodoTitle.trim()) {
      alert("Title cannot be empty!");
      return; // This stops the function from continuing
    }

    // check if input length is more than 25 characters
    if (newTodoTitle.length > 25) {
      alert("The item name is too long!");
      return; // This stops the function from continuing
    }

    let newToDoObj = {
      title: newTodoTitle,
    };

    let updatedTodoArr = [...allTodos, newToDoObj];
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

    setNewTodoTitle(""); // This clears the input field for the next To-Do
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    // console.log (index);

    // console.log (reducedTodos);
    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);
    setCompletedTodos(reducedCompletedTodos);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
  };

  const handleComplete = (index) => {
    let filteredTodo = {
      ...allTodos[index],
      isChecked: false,
    };

    // console.log (filteredTodo);

    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log(updatedCompletedList);
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );
    // console.log (index);

    handleToDoDelete(index);
  };

  const atLeastOneChecked = () =>
    (isCompletedScreen ? completedTodos : allTodos).some(
      (todo) => todo.isChecked
    );
  return (
    <div className="App">
      <div className="todo-wrapper">
        <h1>Grocery Bud</h1>
        <form className="todo-input" onSubmit={handleAddNewToDo}>
          <div className="todo-input-item">
            <input
              type="text"
              className="TextBox"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="E.g. Eggs"
            />
            <button className="primary-btn" type="submit">
              Add
            </button>
          </div>
        </form>
        <div className="btn-area">
          <select onChange={handleSort} className="sortBy">
            <option value="default">Sort By</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Buy
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Purchased
          </button>
          {!isCompletedScreen && (
            <BsCheckAll
              title="Mark as Purchased"
              className="check-icon"
              onClick={handleAllComplete}
            />
          )}
          {atLeastOneChecked() && (
            <button
              className="selectAll"
              onClick={
                isCompletedScreen
                  ? handleSelectAllCompleted
                  : handleSelectAllTodos
              }
            >
              {isCompletedScreen
                ? isAllCompletedSelected
                  ? "Deselect All"
                  : "Select All"
                : isAllTodosSelected
                ? "Deselect All"
                : "Select All"}
            </button>
          )}
        </div>

        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => (
              <div
                className="todo-list-item"
                key={index}
                onDoubleClick={() => handleComplete(index)}
                onClick={() => handleCheck(index)}
              >
                <div>
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={index}
                    onChange={(e) => handleCheckboxChange(e, item)}
                    id={`todo-${index}`}
                    checked={item.isChecked || false}
                  />
                  <label htmlFor={`todo-${index}`}>
                    <span className="listText">{item.title}</span>
                  </label>
                </div>
                <span className="spanButtons">
                  <CiEdit
                    title="Edit?"
                    className="edit-icon sbutton"
                    onClick={() => handleEditTodo(index)}
                  />
                  <AiOutlineDelete
                    title="Delete?"
                    className="delete-icon sbutton"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent the click from exciting the parent div's onClick
                      handleToDoDelete(index);
                    }}
                  />
                </span>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div
                className="todo-list-item"
                key={index}
                onClick={() => handleCheckCompleted(index)}
              >
                <div>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={item.isChecked || false}
                  />
                  <span className="listText">{item.title}</span>
                </div>
                <div>
                  <AiOutlineDelete
                    className="delete-icon sbutton"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompletedTodoDelete(index);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
        <div>
          <button className="delete-btn" onClick={handleDeleteChecked}>
            Delete Checked Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
