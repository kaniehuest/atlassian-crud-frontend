import { useCallback, useState } from 'react';

import SensorService from '../services/SensorService';
import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';


export default function ModalDeleteSensor({ idSensor }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const refreshPage = () => {
    window.location.reload(false);
  }

  const deleteSensor = sensor => {
    SensorService.remove(sensor)
      .then(response => {
        console.log(response.data);
        refreshPage()
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <Button appearance="danger" onClick={openModal}>
        Delete
      </Button>

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle appearance="danger">
                You are about to delete a sensor.
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>
                Before you delete it permanently, there’s some things you should
                know:
              </p>
              <ul>
                <li>Nota 1</li>
                <li>Nota 2</li>
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>Cancel</Button>
              <Button appearance="danger" onClick={() => {deleteSensor(idSensor)}}>
                Delete
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
}