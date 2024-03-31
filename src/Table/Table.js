import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';

import { ShowTableFormatDate, formatStatus } from './Format'
import { Link } from 'react-router-dom'
import { head } from './Head'
import ModalDeleteSensor from './ModalDeleteSensor';
import SensorService from '../services/SensorService';


export default function TableControlled({ props }) {
  const [sensors, setSensors] = useState([]);
  const [pageNumber, setPageNumber] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [searchName, setSearchName] = useState("");

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const sensorsRef = useRef();
  sensorsRef.current = sensors;

  useEffect(() => {
    retrieveSensors();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    console.log(searchTitle)
    setSearchName(searchTitle);
  };

  const findByName = () => {
    if (searchName == "") {
      retrieveSensors()
    }
    else {
      SensorService.findByName(searchName)
        .then((response) => {
          setSensors(response.data);
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const retrieveSensors = () => {
    SensorService.getAll()
      .then((response) => {
        setSensors(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function createKey(input) {
    return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
  }

  const rows2 = sensors.map((sensor, index) => ({
    key: `row-${index}-${sensor._id}`,
    cells: [
      {
        key: createKey(sensor.name),
        content: sensor.name,
      },
      {
        key: sensor.creation_date,
        content: ShowTableFormatDate(sensor.creation_date),
      },
      {
        key: sensor.active,
        content: formatStatus(sensor.active),
      },
      {
        key: sensor.serial,
        content: sensor.serial,
      },
      {
        key: sensor.brand,
        content: sensor.brand,
      },
      {
        key: sensor.model,
        content: sensor.model,
      },
      {
        content: (
          <>
            <Button appearance='primary' className="mr-2">
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={"/" + sensor._id}>Edit</Link>
            </Button>
            <ModalDeleteSensor idSensor={sensor._id} />
          </>
        ),
      },
    ],
  }));


  function key_up(e) {
    var enterKey = 13; //Key Code for Enter Key
    if (e.which == enterKey) {
      findByName()
    }
  }

  return (
    <div>
      <div className='d-flex mb-4'>
          <Textfield
            value={searchName}
            onChange={onChangeSearchTitle}
            placeholder="Enter the name of a sensor"
            onKeyDown={key_up}
          />
          <Button
            type="submit"
            appearance="default"
            onClick={findByName}
            className="ml-2"
          >
            Search
          </Button>

          <Button
            appearance="primary"
            className="ml-2 btn btn-success"
          >
          <Link to={"/add"} style={{ color: 'inherit', textDecoration: 'inherit' }}>Add a new sensor</Link>
          </Button>
      </div>

      <div>

        <DynamicTable
          head={head}
          rows={rows2}
          rowsPerPage={5}
          page={pageNumber}
          loadingSpinnerSize="large"
          isLoading={false}
          isFixedSize
          sortKey="term"
          sortOrder="DESC"
          onSort={() => console.log()}
          onSetPage={() => console.log()}
        />
      </div>
    </div>
  );
}