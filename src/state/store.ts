import { combineReducers, createStore } from "redux";
import { todolistReducer } from "./TodoListReducers/todolist-reducer";
import { tasksReducer } from "./TodoListReducers/tasks-reducer";

export type RootReducerType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todoList: todolistReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
