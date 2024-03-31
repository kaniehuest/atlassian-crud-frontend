import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddSensor from "./components/AddSensor";
import Sensor from "./components/Sensor";
import TutorialsList from "./components/SensorsList";
import DefaultExample from "./components/AtlassianNavbar";


function App() {
  return (
    <div>
      <DefaultExample></DefaultExample>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={TutorialsList} />
          <Route exact path="/add" component={AddSensor} />
          <Route path="/:id/" component={Sensor} />
          <Route path="/delete/:id" component={() => console.log("hola")} />
        </Switch>
      </div>


    </div>
  );
}

export default App;
