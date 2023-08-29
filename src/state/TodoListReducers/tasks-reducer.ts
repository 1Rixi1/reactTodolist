import { TasksType, TaskType } from "../../Apps/App";
import {
  AddTodoListActionType,
  RemoveTodolistActionType,
  todolistID1,
  todolistID2,
} from "./todolist-reducer";
import { v1 } from "uuid";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  payload: {
    todoListId: string;
    taskId: string;
  };
};

type AddTaskActionType = {
  type: "ADD-TASK";
  payload: {
    todoListId: string;
    title: string;
  };
};

type ChangeStatusTaskActionType = {
  type: "CHANGE-STATUS-TASK";
  payload: {
    todoListId: string;
    taskId: string;
    iSDone: boolean;
  };
};

type EditTaskActionType = {
  type: "EDIT-TITLE-TASK";
  payload: {
    todoListId: string;
    taskId: string;
    title: string;
  };
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusTaskActionType
  | EditTaskActionType
  | AddTodoListActionType
  | RemoveTodolistActionType;

const initialState = {

};

export const tasksReducer = (
  state: TasksType = initialState,
  action: ActionsType
): TasksType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    }

    case "ADD-TASK": {
      const newTask: TaskType = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };

      return {
        ...state,
        [action.payload.todoListId]: [
          ...state[action.payload.todoListId],
          newTask,
        ],
      };
    }

    case "CHANGE-STATUS-TASK": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, isDone: action.payload.iSDone }
            : t
        ),
      };
    }

    case "EDIT-TITLE-TASK": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, title: action.payload.title }
            : t
        ),
      };
    }

    case "ADDED-TODOLIST": {
      return {
        ...state,
        [action.payload.todoListId]: [],
      };
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.todoListId];
      return stateCopy;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (
  todoListId: string,
  taskId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todoListId,
      taskId,
    },
  };
};

export const addTaskAC = (
  todoListId: string,
  title: string
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    payload: {
      todoListId,
      title,
    },
  };
};

export const changeStatusTaskAC = (
  todoListId: string,
  taskId: string,
  iSDone: boolean
): ChangeStatusTaskActionType => {
  return {
    type: "CHANGE-STATUS-TASK",
    payload: {
      todoListId,
      taskId,
      iSDone,
    },
  };
};

export const editTaskAC = (
  todoListId: string,
  taskId: string,
  title: string
): EditTaskActionType => {
  return {
    type: "EDIT-TITLE-TASK",
    payload: {
      todoListId,
      taskId,
      title,
    },
  };
};
