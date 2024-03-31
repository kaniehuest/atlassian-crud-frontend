import React, { useState, useEffect, useMemo, useRef, Fragment } from "react";
import moment from 'moment'

import SensorDataService from "../services/SensorService";
import TableControlled from "../Table/Table";



const TutorialsList = (props) => {
  const [sensors, setSensors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const sensorsRef = useRef();

  sensorsRef.current = sensors;

  useEffect(() => {
    retrieveTutorials();
  }, []);

 


  const retrieveTutorials = () => {
    SensorDataService.getAll()
      .then((response) => {
        setSensors(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

 

  const openSensor = (rowIndex) => {
    const id = sensorsRef.current[rowIndex]._id;
    props.history.push("/" + id);
  };

  const deleteSensor = (rowIndex) => {
    const id = sensorsRef.current[rowIndex]._id;

    SensorDataService.remove(id)
      .then((response) => {
        props.history.push("/");

        let newTutorials = [...sensorsRef.current];
        newTutorials.splice(rowIndex, 1);

        setSensors(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };



  return (
    <div className="list row">
      <TableControlled props={sensors}></TableControlled>
    </div>
  );
};

export default TutorialsList;
