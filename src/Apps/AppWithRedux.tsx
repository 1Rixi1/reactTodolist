import React, { useCallback, useReducer, useState } from "react";
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
  todolistID1,
  todolistID2,
  todolistReducer,
} from "../state/TodoListReducers/todolist-reducer";
import {
  addTaskAC,
  changeStatusTaskAC,
  editTaskAC,
  removeTaskAC,
  tasksReducer,
} from "../state/TodoListReducers/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../state/store";
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

function AppWithRedux() {
  console.log("app is called");

  const dispatch = useDispatch();

  const todolists = useSelector<RootReducerType, TodolistsType[]>(
    (state) => state.todoList
  );

  const tasks = useSelector<RootReducerType, TasksType>((state) => state.tasks);

  const removeTask = useCallback(
    (id: string, todoListId: string) => {
      const action = removeTaskAC(todoListId, id);
      dispatch(action);
    },
    [dispatch]
  );

  const addTask = useCallback(
    (todoListId: string, title: string) => {
      const action = addTaskAC(todoListId, title);
      dispatch(action);
    },
    [dispatch]
  );

  const editItemTask = useCallback(
    (todoListId: string, taskId: string, title: string) => {
      const action = editTaskAC(todoListId, taskId, title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeStatusTask = useCallback(
    (taskId: string, isDone: boolean, todoListId: string) => {
      const action = changeStatusTaskAC(todoListId, taskId, isDone);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodoListAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    (todoListId: string) => {
      dispatch(removeTodolistAC(todoListId));
    },
    [dispatch]
  );

  const editItemTodoList = useCallback(
    (todoListId: string, title: string) => {
      dispatch(changeTodoListTitleAC(todoListId, title));
    },
    [dispatch]
  );

  const changeFilterTodoList = useCallback(
    (value: FilterValuesType, todoListId: string) => {
      dispatch(changeTodoListFilterAC(todoListId, value));
    },
    [dispatch]
  );

  const mappedTasks = todolists.map((tl) => {
    let allTasks = tasks[tl.id];
    return (
      <Grid item>
        <Paper elevation={6} style={{ padding: "20px" }}>
          <Todolist
            key={tl.id}
            todoListId={tl.id}
            title={tl.title}
            tasks={allTasks}
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

export default AppWithRedux;
