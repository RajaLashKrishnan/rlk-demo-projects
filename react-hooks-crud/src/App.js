import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPclRequest from "./components/AddPclRequest";
import UploadPclRequest from "./components/UploadPclRequest";
import PclRequest from "./components/PclRequest";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import PclRequestsList from "./components/PclRequestsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/pclrequests" className="navbar-brand">
          DEMO Process Change Request App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/pclrequests"} className="nav-link">
              Process Change Requests
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/upload"} className="nav-link">
              Upload
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/pclrequests"]} component={PclRequestsList} />
          <Route exact path="/add" component={AddPclRequest} />
          <Route exact path="/tutorials" component={TutorialsList} />
          <Route exact path="/upload" component={UploadPclRequest} />
          <Route path="/pclrequests/:id" component={PclRequest} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
