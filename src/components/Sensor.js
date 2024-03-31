import { useCallback, useState, Fragment, useEffect } from "react";
import { Checkbox } from '@atlaskit/checkbox';
import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import { Redirect } from "react-router-dom";
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

import TutorialDataService from "../services/SensorService";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';

import { useHistory } from 'react-router-dom'
import { ShowInputFormatDate } from "../Table/Format";

const Sensor = props => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const initialSensorState = {
    id: null,
    name: "",
    creation_date: new Date(),
    active: false,
    serial: "",
    brand: "",
    model: "",
  };
  const [currentSensor, setCurrentSensor] = useState(initialSensorState);
  const [message, setMessage] = useState("");

  const history = useHistory();
  const routeChange = () => {
    let path = "/";
    history.push(path);
  }

  const getSensor = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentSensor(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSensor(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentSensor({ ...currentSensor, [name]: value });
  };

  const updateStatus = status => {
    var data = {
      id: currentSensor._id.trim(),
      name: currentSensor.name.trim(),
      creation_date: currentSensor.creation_date,
      active: status,
      serial: currentSensor.serial.trim(),
      brand: currentSensor.brand.trim(),
      model: currentSensor.model.trim()
    };

    TutorialDataService.update(currentSensor._id, data)
      .then(response => {
        setCurrentSensor({ ...currentSensor, active: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateSensor = () => {
    var data = {
      name: currentSensor.name.trim(),
      creation_date: currentSensor.creation_date,
      active: currentSensor.isChecked,
      serial: currentSensor.serial.trim(),
      brand: currentSensor.brand.trim(),
      model: currentSensor.model.trim(),
    };
  
    TutorialDataService.update(currentSensor._id, data)
      .then(response => {
        console.log(response.data);
        setMessage(<Redirect to="/" />);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteSensor = () => {
    TutorialDataService.remove(currentSensor._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSensor ? (
        <div className="edit-form">
          <Form onSubmit={updateSensor}>
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <FormHeader
                  title="Edit a sensor"
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
                          value={currentSensor.name}
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
                          value={ShowInputFormatDate(currentSensor.creation_date)}
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



                  {/* STATUS FIELD */}
                  <CheckboxField name="active" label="Status" defaultIsChecked>
                    {({ fieldProps }) => (
                      currentSensor.active ? (
                        <Checkbox
                          autoComplete="off" {...fieldProps}
                          className="form-control"
                          id="active"
                          isChecked={currentSensor.active}
                          required
                          onClick={() => updateStatus(false)}
                          name="active"
                          label="Is the sensor active?"
                        />) : (
                        <Checkbox
                          autoComplete="off" {...fieldProps}
                          className="form-control"
                          id="active"
                          required
                          isChecked={currentSensor.active}
                          onClick={() => updateStatus(true)}
                          name="active"
                          label="Is the sensor active?"
                        />
                      )
                    )}
                  </CheckboxField>

                  {/* BRAND FIELD */}
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
                          value={currentSensor.brand}
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



                  {/* MODEL FIELD */}
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
                          value={currentSensor.model}
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



                  {/* SERIAL FIELD */}
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
                          value={currentSensor.serial}
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



                <div className="d-flex flex-row-reverse mt-4">
                  { /** 
             * 
            <Button appearance="danger" onClick={openModal}>
              Delete
            </Button>
             */}

                  <LoadingButton
                    type="submit"
                    appearance="primary"
                    isLoading={submitting}
                  >
                    Update
                  </LoadingButton>
               
                  <Button
                    appearance="subtle"
                    onClick={routeChange}
                  >
                    Cancel
                  </Button>

                  {/**
 * 
             MODAL FOR DELETE SENSOR 
            <ModalTransition>
              {isOpen && (
                <Modal onClose={closeModal}>
                  <ModalHeader>
                    <ModalTitle appearance="danger">You are going to delete a sensor</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    Clicking <b>delete</b> will delete the sensor permanently.
                  </ModalBody>
                  <ModalFooter>
                    <Button appearance="subtle" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button appearance="danger" onClick={deleteSensor} autoFocus>
                      Delete
                    </Button>
                  </ModalFooter>
                </Modal>
              )}
            </ModalTransition>

 */}
                </div>





              </form>
            )}
          </Form>




          <div className="d-flex flex-row-reverse mt-4">
            { /** 
             * 
            <Button appearance="danger" onClick={openModal}>
              Delete
            </Button>
     
             //////MODAL FOR DELETE SENSOR //////////
            <ModalTransition>
              {isOpen && (
                <Modal onClose={closeModal}>
                  <ModalHeader>
                    <ModalTitle appearance="danger">You are going to delete a sensor</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    Clicking <b>delete</b> will delete the sensor permanently.
                  </ModalBody>
                  <ModalFooter>
                    <Button appearance="subtle" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button appearance="danger" onClick={deleteSensor} autoFocus>
                      Delete
                    </Button>
                  </ModalFooter>
                </Modal>
              )}
            </ModalTransition>

 */}
          </div>

          <p>{message}</p>

        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Sensor;