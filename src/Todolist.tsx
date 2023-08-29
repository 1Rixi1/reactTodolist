import React, { useCallback } from "react";
import { FilterValuesType } from "./Apps/AppWithRedux";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { EditableSpan } from "./components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import Task from "./components/Task/Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  editItemTask: (todoListId: string, taskId: string, title: string) => void;
  editItemTodoList: (todoListId: string, title: string) => void;
  filter: FilterValuesType;
};

export const Todolist = React.memo((props: PropsType) => {
  console.log("Todolist is called");

  const addTaskTodoList = useCallback(
    (title: string) => {
      props.addTask(props.todoListId, title);
    },
    [props.addTask, props.todoListId]
  );

  const editTitleTodoList = useCallback(
    (title: string) => {
      props.editItemTodoList(props.todoListId, title);
    },
    [props.editItemTodoList, props.todoListId]
  );

  const onClickRemoveTodolistHandler = () => {
    props.removeTodoList(props.todoListId);
  };

  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.todoListId);
  }, [props.changeFilter, props.todoListId]);

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter("active", props.todoListId);
  }, [props.changeFilter, props.todoListId]);

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter("completed", props.todoListId);
  }, [props.changeFilter, props.todoListId]);

  let copyTasks = [...props.tasks];

  if (props.filter === "active") {
    copyTasks = props.tasks.filter((t) => !t.isDone);
  }

  if (props.filter === "completed") {
    copyTasks = props.tasks.filter((t) => t.isDone);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} callBack={editTitleTodoList} />

        <Button
          variant="contained"
          size="small"
          onClick={onClickRemoveTodolistHandler}
        >
          x
        </Button>
      </h3>
      <AddItemForm callBack={addTaskTodoList} />

      <ul>
        {copyTasks.map((t) => {
          return (
            <Task
              key={t.id}
              task={t}
              todoListId={props.todoListId}
              editItemTask={props.editItemTask}
              removeTask={props.removeTask}
              changeTaskStatus={props.changeTaskStatus}
            />
          );
        })}
      </ul>

      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "contained"}
          color="success"
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "contained"}
          color="primary"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "contained"}
          color="warning"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
