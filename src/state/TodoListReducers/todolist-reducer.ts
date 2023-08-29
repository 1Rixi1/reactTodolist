import { FilterValuesType, TodolistsType } from "../../Apps/App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: {
    todoListId: string;
  };
};

export type AddTodoListActionType = {
  type: "ADDED-TODOLIST";
  payload: {
    newTitle: string;
    todoListId: string;
  };
};

type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  todoListId: string;
  title: string;
};

type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todoListId: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: TodolistsType[] = [];

export const todolistReducer = (
  state: TodolistsType[] = initialState,
  action: ActionsType
): TodolistsType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todoListId);
    }

    case "ADDED-TODOLIST": {
      return [
        {
          id: action.payload.todoListId,
          title: action.payload.newTitle,
          filter: "all",
        },
        ...state,
      ];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.id === action.todoListId ? { ...tl, title: action.title } : tl
      );
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) =>
        tl.id === action.todoListId ? { ...tl, filter: action.filter } : tl
      );
    }

    default: {
      return state;
    }
  }
};

export const removeTodolistAC = (
  todoListId: string
): RemoveTodolistActionType => ({
  type: "REMOVE-TODOLIST",
  payload: {
    todoListId,
  },
});

export const addTodoListAC = (title: string): AddTodoListActionType => ({
  type: "ADDED-TODOLIST",
  payload: {
    newTitle: title,
    todoListId: v1(),
  },
});

export const changeTodoListTitleAC = (
  todoListId: string,
  title: string
): ChangeTodoListTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  todoListId,
  title,
});

export const changeTodoListFilterAC = (
  todoListId: string,
  filter: FilterValuesType
): ChangeTodoListFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  todoListId,
  filter,
});
