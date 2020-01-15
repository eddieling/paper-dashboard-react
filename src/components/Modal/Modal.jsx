import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import {
  Grid,
  Row,
  Col,
  ControlLabel,
  Form
} from "react-bootstrap";
// import Form from 'react-bootstrap/lib/Form';

export function MyModal(props) {

  const listOfStates = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Kuala Lumpur',
    'Labuan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Penang',
    'Perak',
    'Perlis',
    'Putrajaya',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu'
  ];

  const listOfMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const listOfDays = Array.from({ length: 31 }, (v, k) => k + 1);
  const listOfYears = (Array.from({ length: 120 }, (v, k) => k + 1901)).reverse();


  const countryList = require('country-list');
  const listOfCountries = countryList.getNames().sort();


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Information
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row}as={Row} controlId="formHorizontalFullName">
            <Col  sm={3}>
              Full Name
            </Col>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Full Name" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalEmail">
            <Col  sm={3}>
              Email
            </Col>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalPhoneNum">
            <Col  sm={3}>
              Phone Number
            </Col>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Phone Number" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalDateOfBirth">
            <Col  sm={3}>
              Date of Birth
            </Col>
            <Col sm={2}>
              <Form.Control as="select" placeholder="Day" >
                <option value="" style={{ display: 'none' }}>Day</option>
                {listOfDays.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control as="select" placeholder="select" >
                <option value="" style={{ display: 'none' }}>Month</option>
                {listOfMonths.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control as="select" placeholder="select" >
                <option value="" style={{ display: 'none' }}>Year</option>
                {listOfYears.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalAddressLine1">
            <Col sm={3}>
              Address Line 1
            </Col>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Address Line 1" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalAddressLine2">
            <Col sm={3}>
              Address Line 2 (Optional)
            </Col>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Address Line 2 (Optional)" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalCity">
            <Col sm={3}>
              City
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="City" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalState">
            <Col sm={3}>
              State
            </Col>
            <Col sm={4}>
              <Form.Control as="select" placeholder="select" >
                <option value="">Select a state</option>
                {listOfStates.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalPostalCode">
            <Col sm={3}>
              Postal Code
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Postal Code" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}controlId="formHorizontalCountry">
            <Col sm={3}>
              Country
            </Col>
            <Col sm={4}>
              <Form.Control as="select" placeholder="select" >
                <option value="">Select a country</option>
                {listOfCountries.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {/* <Button bsStyle="info" pullRight fill type="submit"> */}
        <Button  type="submit">
          Update Profile
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}