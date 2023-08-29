import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "../../Apps/AppWithRedux";

type TaskPropsType = {
  todoListId: string;
  task: TaskType;

  editItemTask: (todolistId: string, taskId: string, title: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
};

const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const editTitleTaskHandler = (title: string) => {
    props.editItemTask(props.todoListId, props.task.id, title);
  };

  const onClickHandler = () =>
    props.removeTask(props.task.id, props.todoListId);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(
      props.task.id,
      e.currentTarget.checked,
      props.todoListId
    );
  };

  return (
    <li className={props.task.isDone ? "is-done" : ""}>
      <Checkbox onChange={onChangeHandler} checked={props.task.isDone} />
      <EditableSpan title={props.task.title} callBack={editTitleTaskHandler} />
      <IconButton aria-label="delete" size="small" onClick={onClickHandler}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </li>
  );
});

export default Task;
