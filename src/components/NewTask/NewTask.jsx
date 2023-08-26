import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHTTP from "../../hooks/useHTTP";

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHTTP();

  const enterTaskHandler = async (taskText) => {
    const createTask = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };

    sendRequest(
      {
        url: "https://react-http-17483-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
