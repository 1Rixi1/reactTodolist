import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  callBack: (title: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(
  (props) => {

    console.log("EditableSpan is called");
    const { title, callBack } = props;

    const [value, setValue] = useState("");

    const [edit, setIsEdit] = useState(false);

    const onDoubleClickSpanHandler = () => {
      setValue(title);
      setIsEdit(true);
    };

    const onBlurInputHandler = () => {
      setIsEdit(false);
      callBack(value);
    };

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    };

    return (
      <>
        {edit ? (
          <input
            type="text"
            value={value}
            onChange={onChangeValueHandler}
            onBlur={onBlurInputHandler}
            autoFocus={true}
          />
        ) : (
          <span onDoubleClick={onDoubleClickSpanHandler}>{title}</span>
        )}
      </>
    );
  }
);
