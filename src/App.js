import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import CreateTask from "./Components/Task/CreateTask";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<CreateTask createMode={true} />} />
        <Route path="/tasks/:id" element={<CreateTask />} />
      </Routes>
    </>
  );
}

export default App;
