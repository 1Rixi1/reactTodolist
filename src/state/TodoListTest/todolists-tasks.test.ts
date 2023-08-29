import { TasksType, TodolistsType } from "../../Apps/App";
import {
  addTodoListAC,
  removeTodolistAC,
  todolistReducer,
} from "../TodoListReducers/todolist-reducer";
import { tasksReducer } from "../TodoListReducers/tasks-reducer";
import { useState } from "react";
import { v1 } from "uuid";

test("ids should be equals", () => {
  const startTasksState: TasksType = {};
  const startTodoListsState: TodolistsType[] = [];

  const action = addTodoListAC("any title");

  const endTasksState = tasksReducer(startTasksState, action);

  const endTodoListsState = todolistReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);

  const idFromTasks = keys[keys.length - 1];

  const idFromTodoList = endTodoListsState[endTodoListsState.length - 1].id;

  expect(idFromTasks).toBe(action.payload.todoListId);
  expect(idFromTodoList).toBe(action.payload.todoListId);
});

test("ids should be remove for tasks and TodLists", () => {
  const startTodoListsState: TodolistsType[] = [
    { id: "todolistID1", title: "What to learn", filter: "all" },
    { id: "todolistID2", title: "What to buy", filter: "all" },
  ];

  const starTaskState: TasksType = {
    ["todolistID1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    ["todolistID2"]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  };

  const action = removeTodolistAC("todolistID2");

  const endTodoListState = todolistReducer(startTodoListsState, action);
  const endTasksState = tasksReducer(starTaskState, action);

  const keys = Object.keys(endTasksState);

  expect(keys.length).toBe(1);
  expect(keys[0]).toBe("todolistID1");

  expect(endTodoListState[0].id).toBe("todolistID1");
  expect(endTasksState["todolistID1"]).not.toBeUndefined();
});
