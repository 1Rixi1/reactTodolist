import { Provider } from "react-redux";
import { RootReducerType, store } from "../state/store";
import { todolistReducer } from "../state/TodoListReducers/todolist-reducer";
import { tasksReducer } from "../state/TodoListReducers/tasks-reducer";
import { v1 } from "uuid";
import { combineReducers, createStore } from "redux";

const rootState = combineReducers({
  todoList: todolistReducer,
  tasks: tasksReducer,
});

const initGlobalState = {
  todoList: [
    { id: "todolistId1", title: "Technologies", filter: "all" },
    { id: "todolistId2", title: "Cars", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "React",
        isDone: false,
      },
      {
        id: v1(),
        title: "Redux",
        isDone: false,
      },
      {
        id: v1(),
        title: "TypeScript",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "BMW",
        isDone: false,
      },
      {
        id: v1(),
        title: "Audi",
        isDone: false,
      },
      {
        id: v1(),
        title: "Kia",
        isDone: false,
      },
    ],
  },
};

export const storeForStoryBook = createStore(
  rootState,
  initGlobalState as RootReducerType
);

export const ReduxProviderDecorator = (storyFn: any) => {
  return <Provider store={storeForStoryBook}>{storyFn()}</Provider>;
};
