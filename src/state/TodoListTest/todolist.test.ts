import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "../../Apps/App";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC,
  todolistReducer,
} from "../TodoListReducers/todolist-reducer";

test("todolist should be removed", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const startDataTodoLists: TodolistsType[] = [
    {
      id: todoListId_1,
      title: "Technologies",
      filter: "completed",
    },
    {
      id: todoListId_2,
      title: "Product",
      filter: "active",
    },
  ];

  const endDataTodoLists = todolistReducer(
    startDataTodoLists,
    removeTodolistAC(todoListId_1)
  );

  expect(endDataTodoLists[0].id).toBe(todoListId_2);
  expect(endDataTodoLists.length).toBe(1);
});

test("todolist should be added", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const startState: TodolistsType[] = [
    {
      id: todoListId_1,
      title: "Technologies",
      filter: "all",
    },
    {
      id: todoListId_2,
      title: "Product",
      filter: "all",
    },
  ];

  const newTitle = "Cars";

  const endState = todolistReducer(startState, addTodoListAC(newTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
});

test("user reducer should be change Title todoList", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const startTodoLists: TodolistsType[] = [
    {
      id: todoListId_1,
      title: "Technologies",
      filter: "all",
    },
    {
      id: todoListId_2,
      title: "Product",
      filter: "all",
    },
  ];

  const newTodoListTitle = "Cars";

  const endTodoLists = todolistReducer(
    startTodoLists,
    changeTodoListTitleAC(todoListId_1, newTodoListTitle)
  );

  expect(endTodoLists[0].title).toBe(newTodoListTitle);
  expect(endTodoLists[1].title).toBe("Product");
});

test("user reducer should be change filter todoList", () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const startState: TodolistsType[] = [
    {
      id: todoListId_1,
      title: "Technologies",
      filter: "all",
    },
    {
      id: todoListId_2,
      title: "Product",
      filter: "all",
    },
  ];

  const newFilterTodoList: FilterValuesType = "active";

  const endState = todolistReducer(
    startState,
    changeTodoListFilterAC(todoListId_2, newFilterTodoList)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilterTodoList);
});
