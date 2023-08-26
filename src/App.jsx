import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHTTP from "./hooks/useHTTP";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest } = useHTTP();

  useEffect(() => {
    const transformTask = (taskObj) => {
      const loadedTask = [];

      for (const key in taskObj) {
        loadedTask.push({ id: key, text: taskObj[key].text });
      }
      setTasks(loadedTask);
    };
    sendRequest(
      {
        url: "https://react-http-17483-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      transformTask
    );
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
