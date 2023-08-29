import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import s from "./AddItemForm.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField/TextField";

type AddItemFormPropsType = {
  callBack: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
  (props) => {
    console.log("AddItemForm is called");
    const { callBack } = props;

    const [value, setValue] = useState("");

    const [error, setError] = useState<string | null>("");

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    };

    const onClickBtnHandler = () => {
      if (value.trim() === "") {
        setError("Error !!!");
        return;
      }
      callBack(value);
      setValue("");
    };

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== "") {
        setError("");
      }

      if (e.charCode === 13) {
        onClickBtnHandler();
        setValue("");
      }
    };

    const classesInput = error ? s.error : "";

    const btnStyles = {
      maxWidth: "38px",
      maxHeight: "38px",
      minWidth: "38px",
      minHeight: "38px",
      backgroundColor: "black",
    };

    return (
      <div>
        <TextField
          error={!!error}
          id="outlined-basic"
          label={error ? "Title is required" : "please type smth..."}
          variant="outlined"
          className={classesInput}
          value={value}
          onChange={onChangeInputHandler}
          onKeyPress={onKeyPressInputHandler}
          size={"small"}
          multiline
          maxRows={4}
        />
        <Button
          variant="contained"
          size="small"
          onClick={onClickBtnHandler}
          style={btnStyles}
        >
          +
        </Button>
      </div>
    );
  }
);
