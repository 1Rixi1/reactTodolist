import { v1 } from "uuid";
import {
  addTaskAC,
  changeStatusTaskAC,
  editTaskAC,
  removeTaskAC,
  tasksReducer,
} from "../TodoListReducers/tasks-reducer";
import { Simulate } from "react-dom/test-utils";
import ended = Simulate.ended;
import {
  addTodoListAC,
  removeTodolistAC,
} from "../TodoListReducers/todolist-reducer";

test("task should be remove of todoList", () => {
  const startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  };

  const action = removeTaskAC("todolistID2", "2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"].length).toBe(4);
  expect(endState["todolistID2"][1].id).toBe("3");

  expect(endState["todolistID2"].every((t) => t.id !== "2")).toBeTruthy();

  expect(endState["todolistID1"].length).toBe(5);
  expect(endState["todolistID1"][1].id).toBe("2");
});

test("added task for todoList", () => {
  const startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  };

  const newTitleTask = "Typescript";

  const action = addTaskAC("todolistID1", newTitleTask);

  const endState = tasksReducer(startState, action);

  expect(endState["todolistID1"].length).toBe(6);
  expect(endState["todolistID1"][5].title).toBe(newTitleTask);

  expect(endState["todolistID2"].length).toBe(5);
  expect(endState["todolistID2"][4].title).toBe("GraphQL2");
});

test("change task status checkbox for todoList", () => {
  const startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  };

  const action = changeStatusTaskAC("todolistID2", "4", true);

  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"][3].isDone).toBeTruthy();
  expect(endState["todolistID2"].length).toBe(5);

  expect(endState["todolistID1"][3].isDone).toBeFalsy();
});

test("edit title task for todoList", () => {
  const startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  };

  const newTitle = "Redux";

  const action = editTaskAC("todolistID2", "2", newTitle);

  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"][1].title).toBe(newTitle);
  expect(endState["todolistID1"][1].title).toBe("JS");
});

test("added tasks when added todoList", () => {
  const startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  };

  const action = addTodoListAC("any title");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  const isNewKeys = keys.find(
    (k) => k !== "todolistID1" && k !== "todolistID2"
  );

  if (!isNewKeys) {
    throw new Error("I dont understand this key");
  }

  expect(keys.length).toBe(3);
});

test("tasks should be removed when delete Todolist", () => {
  const startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  };

  const action = removeTodolistAC("todolistID2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(endState["todolistID2"]).toBeUndefined();
  expect(keys.length).toBe(1);
});
