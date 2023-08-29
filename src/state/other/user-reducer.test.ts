import { StateType, userReducer } from "./user-reducer";

test("user reducer should incr only age", () => {
  const startState: StateType = {
    age: 22,
    childrenCount: 2,
    name: "Maksim",
  };

  const endState = userReducer(startState, { type: "INCR-AGE" });

  expect(endState.age).toBe(23);
  expect(endState.childrenCount).toBe(2);
});

test("user reducer should incr only children count", () => {
  const startState: StateType = {
    age: 22,
    childrenCount: 2,
    name: "Maksim",
  };

  const endState = userReducer(startState, { type: "INCR-CHILDREN-COUNT" });

  expect(endState.childrenCount).toBe(3);
  expect(endState.age).toBe(22);
});

test("user reducer should only change name", () => {
  const startState: StateType = {
    age: 22,
    childrenCount: 2,
    name: "Maksim",
  };

  const newName = "Nikita";

  const endState = userReducer(startState, { type: "CHANGE-NAME", newName });

  expect(endState.name).toBe(newName);
});


