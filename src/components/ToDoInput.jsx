export function ToDoInput(props){
    return(
    <form className="todo-input" onSubmit={props.handleAddNewToDo}>
    <div className="todo-input-item">
      <input
        type="text"
        className="TextBox"
        value={props.newTodoTitle}
        onChange={(e) => props.setNewTodoTitle(e.target.value)}
        placeholder="E.g. Eggs"
      />
      <button className="primary-btn" type="submit">
        Add
      </button>
    </div>
  </form>)
}

