import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const request = await fetch("http://localhost:8000/tasks");
      const requestToJson = await request.json();
      setTasks(requestToJson);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="row" style={{overflow:'auto'}}>
        {tasks && tasks.length > 0
          ? tasks.map((task) => (
              <div className="col-xl-2 col-md-6 justify-content-center">
                <Card style={{ width: "18rem" }} className="m-3">
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.content}</Card.Text>
                    <div className="d-flex ">
                      <Card.Text className="mx-4 px-3 py-1 border bg-primary text-white">
                        {task.status}
                      </Card.Text>
                      <Card.Link>
                        <Link to={`/tasks/${task.id}`}>
                          <i class="bi bi-pencil-square"></i>
                        </Link>
                      </Card.Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
