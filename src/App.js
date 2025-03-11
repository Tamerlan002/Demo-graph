// App.js
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import Topic from "./Topic"
import LCStage from "./LCStage";
import Subtopic from "./Subtopic"

function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lcstage/:id" element={<LCStage />} />
          <Route path="/topic/:id" element={<Topic />} />
          <Route path="/subtopic/:id" element={<Subtopic />} />
        </Routes>
    </div>
  );
}

export default App;
