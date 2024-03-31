import { useState, Fragment, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox } from '@atlaskit/checkbox';
import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import { Redirect } from "react-router-dom";
import SensorDataService from "../services/SensorService";
import Moment from 'moment'
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button/standard-button';
import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
} from '@atlaskit/form';


const AddSensor = () => {
  const initialSensorState = {
    id: null,
    name: "",
    creation_date: new Date(),
    active: false,
    serial: "",
    brand: "",
    model: "",
  };


  // STATUS LOGIC
  const [isChecked, setIsChecked] = useState(true);
  const [onChangeResultStatus, setOnChangeResultStatus] = useState('true');

  const onChangeStatus = useCallback((event) => {
    setIsChecked((current) => !current);
    setOnChangeResultStatus(`${event.target.checked}`);
  }, []);




  const [sensor, setSensor] = useState(initialSensorState);
  const [submitted, setStatus] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSensor({ ...sensor, [name]: value });
    console.log(sensor)
  };

  const history = useHistory();
  const routeChange = () => {
    let path = "/";
    history.push(path);
  }

  const saveSensor = () => {
    var data = {
      name: sensor.name.trim(),
      creation_date: sensor.creation_date,
      active: isChecked,
      serial: sensor.serial.trim(),
      brand: sensor.brand.trim(),
      model: sensor.model.trim(),
    };

    SensorDataService.create(data)
      .then(response => {
        setSensor({
          id: response.data.id,
          name: response.data.name,
          creation_date: response.data.creation_date,
          active: response.data.active,
          serial: response.data.serial,
          brand: response.data.brand,
          model: response.data.model
        });
        setStatus(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newSensor = () => {
    setSensor(initialSensorState);
    setStatus(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <Redirect to="/"></Redirect>
      ) : (
        <div>
          <Form onSubmit={saveSensor}>
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <FormHeader
                  title="Create a new sensor"
                  description="* indicates a required field"
                />
                <FormSection>


                  {/* NAME FIELD */}
                  <Field
                    aria-required={true}
                    name="name"
                    label="Name"
                    isRequired
                  >
                    {({ fieldProps, error }) => (
                      <Fragment>
                        <TextField
                          autoComplete="off" {...fieldProps}
                          type="text"
                          placeholder="Sensor de agua"
                          className="form-control"
                          id="name"
                          required
                          value={sensor.name}
                          onChange={handleInputChange}
                          name="name"
                        />
                        {!error && (
                          <HelperMessage>
                            You can use letters, numbers and periods.
                          </HelperMessage>
                        )}
                        {error && (
                          <ErrorMessage>
                            This username is already in use, try another one.
                          </ErrorMessage>
                        )}
                      </Fragment>
                    )}
                  </Field>


                  {/* CREATION DATE FIELD */}
                  <Field
                    aria-required={true}
                    name="creation_date"
                    label="Creation Date"
                  >
                    {({ fieldProps, error }) => (
                      <Fragment>
                        <TextField
                          autoComplete="off" {...fieldProps}
                          type="date"
                          className="form-control"
                          id="creation_date"
                          value={sensor.creation_date}
                          onChange={handleInputChange}
                          name="creation_date"
                        />
                        {!error && (
                          <HelperMessage>
                            Default date is the current date and time.
                          </HelperMessage>
                        )}
                        {error && (
                          <ErrorMessage>
                            Not a valid date.
                          </ErrorMessage>
                        )}
                      </Fragment>
                    )}
                  </Field>


                  {/* CHECKBOX FIELD */}
                  <CheckboxField name="active" label="Status" defaultIsChecked>
                    {({ fieldProps }) => (
                      <Checkbox
                        autoComplete="off" {...fieldProps}
                        isChecked={isChecked}
                        className="form-control"
                        id="active"
                        onChange={onChangeStatus}
                        name="active"
                        label={`Is the sensor active?`}
                      />
                    )}
                  </CheckboxField>



                  {/* BRAND FIELD  */}
                  <Field
                    aria-required={true}
                    name="brand"
                    label="Brand"
                    isRequired
                  >
                    {({ fieldProps, error }) => (
                      <Fragment>
                        <TextField
                          autoComplete="off" {...fieldProps}
                          type="text"
                          className="form-control"
                          id="brand"
                          required
                          placeholder="Marca de sensor XYZ"
                          value={sensor.brand}
                          onChange={handleInputChange}
                          name="brand"
                        />
                        {error && (
                          <ErrorMessage>
                            Not a valid brand.
                          </ErrorMessage>
                        )}
                      </Fragment>
                    )}
                  </Field>




                  {/* MODEL FIELD  */}
                  <Field
                    aria-required={true}
                    name="model"
                    label="Model"
                    isRequired
                  >
                    {({ fieldProps, error }) => (
                      <Fragment>
                        <TextField
                          autoComplete="off" {...fieldProps}
                          type="text"
                          className="form-control"
                          id="model"
                          required
                          placeholder="Modelo XYZ-1000"
                          value={sensor.model}
                          onChange={handleInputChange}
                          name="model"
                        />
                        {error && (
                          <ErrorMessage>
                            Not a valid model.
                          </ErrorMessage>
                        )}
                      </Fragment>
                    )}
                  </Field>


                  {/* SERIAL FIELD  */}
                  <Field
                    aria-required={true}
                    name="serial"
                    label="Serial"
                    isRequired
                  >
                    {({ fieldProps, error }) => (
                      <Fragment>
                        <TextField
                          autoComplete="off" {...fieldProps}
                          type="text"
                          className="form-control"
                          id="serial"
                          required
                          placeholder="1122334455"
                          value={sensor.serial}
                          onChange={handleInputChange}
                          name="serial"
                        />
                        {error && (
                          <ErrorMessage>
                            Not a valid serial.
                          </ErrorMessage>
                        )}
                      </Fragment>
                    )}
                  </Field>


                </FormSection>
                <FormFooter>
                  <ButtonGroup>
                    <Button
                      appearance="subtle"
                      className="mr-2"
                      onClick={routeChange}
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      type="submit"
                      appearance="primary"
                      isLoading={submitting}
                    >
                      Add
                    </LoadingButton>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>

        </div>
      )}
    </div>
  );
};

export default AddSensor;
