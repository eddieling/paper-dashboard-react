import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import {
  Grid,
  Row,
  Col,
  ControlLabel,
  Form
} from "react-bootstrap";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateUser } from '../../api/users';

export function EditUserModal(props) {

  const [state, setState] = useState({});
  const [editActive, setEditActive] = useState(true);

  useEffect(() => {
    setState(props.selectedMember);
  }, [props]);

  const listOfStates = ['Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'];
  const listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const listOfDays = Array.from({ length: 31 }, (v, k) => k + 1);
  const listOfYears = (Array.from({ length: 120 }, (v, k) => k + 1901)).reverse();

  const countryList = require('country-list');
  const listOfCountries = countryList.getNames().sort();

  const handleUpdateMember = (e) => {
    let birthdate = '';
    if (state.day && state.month && state.year) {
      let monthNum = listOfMonths.indexOf(state.month) + 1;
      birthdate = state.day + '/' + monthNum + '/' + state.year;
    }

    e.preventDefault();
    let newMember = {
      id: state._id,
      fullname: state.fullname,
      email: state.email,
      phone: state.phone,
      birthdate: birthdate,
      address1: state.address1,
      address2: state.address2,
      city: state.city,
      state: state.state,
      postal: state.postal,
      country: state.country,
    }
    console.log('updating', newMember)
    updateUser(newMember);
    handleCloseAdd();
  }


  const reset = () => {
    setState({ fullname: '', email: '', phone: '', day: '', month: '', year: '', birthdate: '', address1: '', address2: '', city: '', state: '', postal: '', country: '', });
  }

  const handleClose = () => {
    props.onHide();
    reset();
  }


  const handleCloseAdd = () => {
    props.onHide();
    reset();
    props.handleClose();
  }


  const handleChange = (e) => { setState({ ...state, [e.target.name]: e.target.value }); console.log('state', state) }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ height: 60 }}>
        <Modal.Title id="contained-modal-title-vcenter" style={{ marginTop: 0 }}>
          Update Member Information
          </Modal.Title>
        {/* <Button style={{alignItems: 'right', display: 'flex', justifyItems: 'right'}} variant="link">
          <FontAwesomeIcon icon={faPen} />
        </Button> */}

      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} as={Row} controlId="formHorizontalFullName">
            <Col sm={3}>
              Full Name
            </Col>
            <Col sm={4}>
              <Form.Control disabled={editActive} type="text" placeholder="Full Name" name="fullname" value={state.fullname} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={3}>
              Email
            </Col>
            <Col sm={4}>
              <Form.Control disabled={editActive} type="text" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhoneNum">
            <Col sm={3}>
              Phone Number
            </Col>
            <Col sm={4}>
              <Form.Control disabled={editActive} type="text" placeholder="Phone Number" name="phone" value={state.phone} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDateOfBirth">
            <Col sm={3}>
              Date of Birth
            </Col>
            <Col sm={2}>
              <Form.Control disabled={editActive} as="select" placeholder="Day" name="day" value={state.day} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>Day</option>
                {listOfDays.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control disabled={editActive} as="select" placeholder="select" name="month" value={state.month} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>Month</option>
                {listOfMonths.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control disabled={editActive} as="select" placeholder="select" name="year" value={state.year} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>Year</option>
                {listOfYears.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddressLine1">
            <Col sm={3}>
              Address Line 1
            </Col>
            <Col sm={9}>
              <Form.Control disabled={editActive} type="text" placeholder="Address Line 1" name="address1" value={state.address1} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddressLine2">
            <Col sm={3}>
              Address Line 2 (Optional)
            </Col>
            <Col sm={9}>
              <Form.Control disabled={editActive} type="text" placeholder="Address Line 2 (Optional)" name="address2" value={state.address2} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalCity">
            <Col sm={3}>
              City
            </Col>
            <Col sm={4}>
              <Form.Control disabled={editActive} type="text" placeholder="City" name="city" value={state.city} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalState">
            <Col sm={3}>
              State
            </Col>
            <Col sm={4}>
              <Form.Control disabled={editActive} as="select" placeholder="select" name="state" value={state.state} onChange={handleChange}>
                <option value="">Select a state</option>
                {listOfStates.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPostalCode">
            <Col sm={3}>
              Postal Code
            </Col>
            <Col sm={4}>
              <Form.Control disabled={editActive} type="text" placeholder="Postal Code" name="postal" value={state.postal} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalCountry">
            <Col sm={3}>
              Country
            </Col>
            <Col sm={4}>
              <Form.Control disabled={editActive} as="select" placeholder="select" name="country" value={state.country} onChange={handleChange}>
                <option value="">Select a country</option>
                {listOfCountries.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer style={{ height: 60 }}>
        <Button type="submit" variant="success" active onClick={handleUpdateMember}>
          Update
        </Button>
        <Button onClick={handleClose} variant="outline-dark">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}