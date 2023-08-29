import { AddItemForm } from "../components/AddItemForm/AddItemForm";

import { action } from "@storybook/addon-actions";

export default {
  title: "AddItemForm Component",
  component: AddItemForm,
};

const handleAddAction = action("button was pressed");

export const Example1 = () => {
  return <AddItemForm callBack={handleAddAction} />;
};
