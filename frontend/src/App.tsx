import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import FilesView from "./components/FilesView";
import FileView from "./components/FileView";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/files/:id" element={<FilesView />} />
        <Route path="/fileview/:id" element={<FileView />} />
      </Routes>
    </Router>
  );
};

export default App;
