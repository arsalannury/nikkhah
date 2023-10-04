import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import "./createTask.css";

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskBody, setTaskBody] = useState("");
  const [taskStatus, setTaskStatus] = useState("Todo");
  const navigate = useNavigate();
  const params = useParams();

  const getTasks = async () => {
    const request = await fetch(`http://localhost:8000/tasks/${params.id}`);
    const requestToJson = await request.json();
    setTaskTitle(requestToJson.title);
    setTaskBody(requestToJson.content);
    setTaskStatus(requestToJson.status);
  };

  useEffect(() => {
    console.log('run');
    if (params.id) {
      getTasks();
    }
    return () => {};
  }, []);

  const createTask = async () => {
    const TaskModel = {
      id: uuidv4(),
      title: taskTitle,
      content: taskBody,
      status: taskStatus,
    };
    try {
      await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(TaskModel),
      });
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateTask = async () => {
    const TaskModel = {
      title: taskTitle,
      content: taskBody,
      status: taskStatus,
    };
    try {
      await fetch(`http://localhost:8000/tasks/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(TaskModel),
      });
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div
      style={{ background: "#a2ceed" }}
      className="
          d-flex align-items-center col-12 justify-content-center task-container"
    >
      <Form className="my-5 bg-white p-5">
        <h2 className="fw-bold">{params.id ? "Edit Task" : "Create Task"}</h2>
        <Form.Group className="mb-3 my-2" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            type="text"
            placeholder="Enter title"
          />
        </Form.Group>

        <textarea
          value={taskBody}
          onChange={(event) => setTaskBody(event.target.value)}
          type="text"
          placeholder="body"
          class="form-control"
          style={{ height: "150px", resize: "none" }}
        />

        <Form.Group className="mb-3 my-2">
          <Form.Select
            value={taskStatus}
            onChange={(event) => setTaskStatus(event.target.value)}
            className="my-3"
            id="disabledSelect"
          >
            <option selected>---</option>
            <option>Todo</option>
            <option>Done</option>
            <option>InQA</option>
          </Form.Select>
        </Form.Group>

        <Button
          onClick={params.id ? updateTask : createTask}
          variant="primary"
          className="mx-2"
        >
          {params.id ? "Edit" : "Create"}
        </Button>
        <Button variant="secondary">Cancel</Button>
      </Form>
    </div>
  );
};

export default CreateTask;
