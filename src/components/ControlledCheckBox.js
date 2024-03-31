import React, { ChangeEvent, useCallback, useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';

import SensorService from '../services/SensorService';
import Sensor from './Sensor';
import { Redirect } from "react-router-dom";


const CheckboxControlledExample = () => {
  const updateStatus = status => {
    var data = {
      active: status,
    };

    SensorService.update(Sensor.currentSensor._id, data)
      .then(response => {
        Sensor.setCurrentSensor({ ...Sensor.currentSensor, active: status });
        console.log(response.data);
        Sensor.setMessage(<Redirect to="/" />);
      })
      .catch(e => {
        console.log(e);
      });
  };



  const [isChecked, setIsChecked] = useState(true);
  const [onChangeResult, setOnChangeResult] = useState('true');

  const onChange = useCallback((event) => {
    setIsChecked((current) => !current);
    setOnChangeResult(`${event.target.checked}`);
  }, []);

  return (
    <div>
      <Checkbox
        isChecked={isChecked}
        onChange={onChange}
        onClick={() => updateStatus(false)}
        label={`Status: ${onChangeResult}`}
        value="Controlled Checkbox"
        name="controlled-checkbox"
      />
    </div>
  );
};

export default CheckboxControlledExample;