import React, { useState } from 'react';

export default function TaskForm() {
  const initialTask: string = '';
  const initalTaskList: string[] = [];
  const [task, setTask] = useState(initialTask);
  const [taskList, setTaskList] = useState(initalTaskList);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTask(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTaskList([...taskList, task]);
    setTask(initialTask);
    console.log('handle submit');
  }

  function handleDelete(task: string) {
    const deleteTask = taskList.filter((item) => item !== task);
    setTaskList(deleteTask);
    console.log('handle submit', task);
  }

  return (
    <div className='App'>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit} data-testid='form'>
        <label htmlFor='task'></label>
        <input
          name='task'
          type='text'
          placeholder='Enter a new task'
          value={task}
          onChange={handleChange}
        ></input>
        <button type='submit'>Add Task</button>
      </form>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            {task}
            <button type='button' onClick={() => handleDelete(task)}>
              Delete Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
