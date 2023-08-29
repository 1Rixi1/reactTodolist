import { AddItemForm } from "../components/AddItemForm/AddItemForm";

import { action } from "@storybook/addon-actions";
import Task from "../components/Task/Task";

export default {
  title: "Task Component",
  component: AddItemForm,
};

const changeTaskStatusAction = action("changeTaskStatus");

const removeTaskAction = action("removeTask");

const editItemTaskAction = action("editItemTask");

export const Example1 = () => {
  return (
    <>
      <Task
        task={{ id: "1", title: "React", isDone: false }}
        todoListId={"todolistId1"}
        changeTaskStatus={changeTaskStatusAction}
        removeTask={removeTaskAction}
        editItemTask={editItemTaskAction}
      />

      <Task
        task={{ id: "3", title: "HTML", isDone: false }}
        todoListId={"todolistId2"}
        changeTaskStatus={changeTaskStatusAction}
        removeTask={removeTaskAction}
        editItemTask={editItemTaskAction}
      />
    </>
  );
};
