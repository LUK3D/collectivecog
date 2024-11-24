import "./assets/main.css";
import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";
import Workspace from "./features/workspace";
import WorkspaceLayout from "./features/workspace/layout";
import ParticleFlow from "./features/editor/flow";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route element={<WorkspaceLayout />}>
        <Route path="/" element={<Workspace />} />
        <Route path="/editor" element={<ParticleFlow />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
