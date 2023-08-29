import React, { useState } from "react";
import "../App.css";
import { Todolist } from "../Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { AppBarButton } from "../components/AppBar/AppBarButton";
import { Container, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksType = {
  [key: string]: TaskType[];
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(id: string, todoListId: string) {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== id),
    });
  }

  function addTask(todoListId: string, title: string) {
    const newTask = {
      id: v1(),
      title,
      isDone: false,
    };

    setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
  }

  function addTodoList(title: string) {
    const newTodoLisId = v1();

    const newTodoList: TodolistsType = {
      id: newTodoLisId,
      title,
      filter: "all",
    };

    setTodolists([...todolists, newTodoList]);

    setTasks({ ...tasks, [newTodoLisId]: [] });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, isDone } : t
      ),
    });
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    setTodolists(
      todolists.map((tl) =>
        tl.id === todoListId ? { ...tl, filter: value } : tl
      )
    );
  }

  function editItemTask(todoListId: string, taskId: string, title: string) {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, title } : t
      ),
    });
  }

  function editItemTodoList(todoListId: string, title: string) {
    setTodolists(
      todolists.map((tl) => (tl.id === todoListId ? { ...tl, title } : tl))
    );
  }

  const mappedTasks = todolists.map((tl) => {
    let copyTasks = tasks[tl.id];

    if (tl.filter === "active") {
      copyTasks = tasks[tl.id].filter((t) => !t.isDone);
    }

    if (tl.filter === "completed") {
      copyTasks = tasks[tl.id].filter((t) => t.isDone);
    }

    return (
      <Grid item>
        <Paper elevation={6} style={{ padding: "20px" }}>
          {/*<Todolist*/}
          {/*  key={tl.id}*/}
          {/*  todoListId={tl.id}*/}
          {/*  title={tl.title}*/}
          {/*  tasks={copyTasks}*/}
          {/*  removeTask={removeTask}*/}
          {/*  changeFilter={changeFilter}*/}
          {/*  addTask={addTask}*/}
          {/*  changeTaskStatus={changeStatus}*/}
          {/*  editItemTask={editItemTask}*/}
          {/*  editItemTodoList={editItemTodoList}*/}
          {/*  filter={tl.filter}*/}
          {/*/>*/}
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <AppBarButton />
      <Container fixed>
        <Grid container style={{ padding: "20px 0 " }}>
          {" "}
          <AddItemForm callBack={addTodoList} />
        </Grid>
        <Grid container spacing={5} rowSpacing={5}>
          {mappedTasks}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
