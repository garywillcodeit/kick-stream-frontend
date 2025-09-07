import React, { useContext, useState } from "react";
import TextArea from "../inputs/TextArea";
import { AddEditContentContext } from "../../contexts/AddEditContentContext";

export default function Description() {
  const { contentData, setContentData } = useContext(AddEditContentContext);
  const [titleError, setTitleError] = useState("");
  const maxLength = 200;

  const onChangeTitle = (e) => {
    const { value } = e.target;
    let title = value.split("").splice(0, maxLength).join("");
    setContentData((p) => ({ ...p, title }));
    setTitleError("");
  };

  return (
    <TextArea
      inputTitle={"Title"}
      placeholder={"What is this video about ?"}
      className={"textarea"}
      maxLength={maxLength}
      value={contentData.title}
      onChange={onChangeTitle}
      message={titleError}
    />
  );
}
