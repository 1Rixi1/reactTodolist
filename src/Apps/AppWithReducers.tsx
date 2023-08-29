import React, { useReducer, useState } from "react";
import "../App.css";
import { Todolist } from "../Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { AppBarButton } from "../components/AppBar/AppBarButton";
import { Container, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC,
  todolistReducer,
} from "../state/TodoListReducers/todolist-reducer";
import {
  addTaskAC,
  changeStatusTaskAC,
  editTaskAC,
  removeTaskAC,
  tasksReducer,
} from "../state/TodoListReducers/tasks-reducer";
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksType = {
  [key: string]: TaskType[];
};

function AppWithReducers() {
  debugger;
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchTodoListReducer] = useReducer(todolistReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(todoListId, id);

    dispatchTasksReducer(action);

  }

  function addTask(todoListId: string, title: string) {
    const action = addTaskAC(todoListId, title);

    dispatchTasksReducer(action);


  }

  function editItemTask(todoListId: string, taskId: string, title: string) {
    const action = editTaskAC(todoListId, taskId, title);

    dispatchTasksReducer(action);


  }

  function changeStatusTask(
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) {
    const action = changeStatusTaskAC(todoListId, taskId, isDone);

    dispatchTasksReducer(action);
  }

  function addTodoList(title: string) {
    const action = addTodoListAC(title);

    dispatchTodoListReducer(action);
    dispatchTasksReducer(action);
  }

  function removeTodoList(todoListId: string) {
    dispatchTodoListReducer(removeTodolistAC(todoListId));
    dispatchTasksReducer(removeTodolistAC(todoListId));
  }

  function editItemTodoList(todoListId: string, title: string) {
    dispatchTodoListReducer(changeTodoListTitleAC(todoListId, title));
  }

  function changeFilterTodoList(value: FilterValuesType, todoListId: string) {
    dispatchTodoListReducer(changeTodoListFilterAC(todoListId, value));
  }

  const mappedTasks = todolists.map((tl) => {
    let copyTasks = tasks[tl.id];

    if (tl.filter === "active") {
      copyTasks = tasks[tl.id].filter((t) => !t.isDone);
    }

    if (tl.filter === "completed") {
      copyTasks = tasks[tl.id].filter((t) => t.isDone);
    }

    return (
      <Grid item>
        <Paper elevation={6} style={{ padding: "20px" }}>
          <Todolist
            key={tl.id}
            todoListId={tl.id}
            title={tl.title}
            tasks={copyTasks}
            removeTask={removeTask}
            changeFilter={changeFilterTodoList}
            addTask={addTask}
            removeTodoList={removeTodoList}
            changeTaskStatus={changeStatusTask}
            editItemTask={editItemTask}
            editItemTodoList={editItemTodoList}
            filter={tl.filter}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <AppBarButton />
      <Container fixed>
        <Grid container style={{ padding: "20px 0 " }}>
          {" "}
          <AddItemForm callBack={addTodoList} />
        </Grid>
        <Grid container spacing={5} rowSpacing={5}>
          {mappedTasks}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
