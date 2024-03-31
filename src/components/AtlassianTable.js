import React, { useState, useMemo, useEffect, useRef } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { DynamicTableStateless } from '@atlaskit/dynamic-table';

import SensorService from '../services/SensorService';

export default function AtlassianTable() {
  const [sensors, setSensors] = useState([]);
  const sensorsRef = useRef();

  sensorsRef.current = sensors;

  const [pageNumber, setPageNumber] = useState(3);
  const navigateTo = (pageNumber) => {
    setPageNumber(pageNumber);
  };




  const head = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Creation date",
        accessor: "creation_date",
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: (props) => {
          return props.value ? "Active" : "Inactive";
        },
      },
      {
        Header: "Serial",
        accessor: "serial",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );


  const retrieveTutorials = () => {
    SensorService.getAll()
      .then((response) => {
        setSensors(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveTutorials();
  }, []);


  return (
    <>
      <ButtonGroup>
        <Button
          isDisabled={pageNumber === 1}
          onClick={() => navigateTo(pageNumber - 1)}
        >
          Previous Page
        </Button>
        <Button
          isDisabled={pageNumber === 5}
          onClick={() => navigateTo(pageNumber + 1)}
        >
          Next Page
        </Button>
      </ButtonGroup>
      <DynamicTableStateless
        head={head}
        rows={sensors}
        rowsPerPage={5}
        page={pageNumber}
        loadingSpinnerSize="large"
        isLoading={false}
        isFixedSize
        sortKey="term"
        sortOrder="DESC"
        onSort={() => console.log('onSort')}
        onSetPage={() => console.log('onSetPage')}
      />
    </>
  );
}