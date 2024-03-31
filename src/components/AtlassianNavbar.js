import logo from '../logo.svg'
import React from 'react';
import { Switch, Route, Link } from "react-router-dom";

import {
  AtlassianNavigation,
  PrimaryButton,
  PrimaryDropdownButton,
  ProductHome,
} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button'

const AtlassianProductHome = () => (
  <Link to={"/"}>
    <img src="./logo192.png" className="img-fluid mr-2" height="10" width="200" alt="logo"></img>
  </Link>
);

const DefaultExample = () => (
  <AtlassianNavigation
    label="site"
    primaryItems={[

      <div className='d-flex' >

{/**
 * 
        <PrimaryButton >
          <Link to={"/add"} style={{ color: 'inherit', textDecoration: 'inherit' }}>Add a new sensor</Link>
        </PrimaryButton>
 */}
      </div>
    ]}
    renderProductHome={AtlassianProductHome}
  />
);

export default DefaultExample;