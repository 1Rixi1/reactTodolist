export type StateType = {
  age: number;
  childrenCount: number;
  name: string;
};

type StateAction = {
  type: string;
  [key: string]: any;
};

export const userReducer = (
  state: StateType,
  action: StateAction
): StateType => {
  switch (action.type) {
    case "INCR-AGE":
      return {
        ...state,
        age: state.age + 1,
      };

    case "INCR-CHILDREN-COUNT":
      return {
        ...state,
        childrenCount: state.childrenCount + 1,
      };

    case "CHANGE-NAME":
      return {
        ...state,
        name: action.newName,
      };

    default:
      throw new Error("I dont understand this action type");
  }
};
