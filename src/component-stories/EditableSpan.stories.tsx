import { action } from "@storybook/addon-actions";
import { EditableSpan } from "../components/EditableSpan/EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};

const changeTitleAction = action("Changed title");
export const Example1 = () => {
  return (
    <>
      <EditableSpan title={"something text"} callBack={changeTitleAction} />
    </>
  );
};
