import React from "react";
import "./App.css";
import MainRouter from "./components/Routers/Router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:7001/";
// axios.defaults.baseURL = "https://minor-project-backend-z7yb.onrender.com";

function App() {
  return (
    <React.Fragment>
      <MainRouter />
    </React.Fragment>
  );
}

export default App;
