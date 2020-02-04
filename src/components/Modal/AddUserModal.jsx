import React, { useState } from "react";

import {
  Modal,
  Row,
  Col,
  Button,
  Form
} from "react-bootstrap";

import { listOfStates, listOfMonths, listOfDays, listOfYears, listOfCountries } from  'variables/general';

import { addUser } from '../../api/users';

export function AddUserModal(props) {

  const [state, setState] = useState({
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    role: '',
    day: '',
    month: '',
    year: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal: '',
    country: '',
  })

  const handleAddMember = (e) => {
    let birthdate = '';
    if (state.birthDay && state.birthMonth && state.birthYear){
      let monthNum = listOfMonths.indexOf(state.birthMonth) + 1;
      birthdate = state.birthDay + '/' + monthNum+ '/' + state.birthYear;
    }

    e.preventDefault();
    let newMember = {
      fullname: state.fullname,
      email: state.email,
      phone: state.phone,
      gender: state.gender,
      role: state.role,
      birthdate: birthdate,
      address1: state.address1,
      address2: state.address2,
      city: state.city,
      state: state.state,
      postal: state.postal,
      country: state.country,
    }
    console.log('adding', newMember)
    addUser(newMember);
    handleCloseUpdate();
  }

  console.log('addusermodal state', state)
  

  const reset = () => {
    setState({});
  }

  const handleClose = () => {
    props.onHide();
    reset();
  }

  const handleCloseUpdate = () => {
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
          Add New Member
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalFullName">
            <Col sm={3}>
              Full Name
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Full Name" name="fullname" value={state.fullname} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={3}>
              Email
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Email" name="email" value={state.email} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhoneNum">
            <Col sm={3}>
              Phone Number
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Phone Number" name="phone" value={state.phone} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhoneNum">
            <Col sm={3}>
              Gender
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Gender" name="gender" value={state.gender} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhoneNum">
            <Col sm={3}>
              Role
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Role" name="role" value={state.role} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDateOfBirth">
            <Col sm={3}>
              Date of Birth
            </Col>
            <Col sm={2}>
              <Form.Control as="select" placeholder="Day" name="birthDay" value={state.birthDay} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>Day</option>
                {listOfDays.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control as="select" placeholder="select" name="birthMonth" value={state.birthMonth} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>Month</option>
                {listOfMonths.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control as="select" placeholder="select" name="birthYear" value={state.birthYear} onChange={handleChange}>
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
            <Col sm={6}>
              <Form.Control type="text" placeholder="Address Line 1" name="address1" value={state.address1} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddressLine2">
            <Col sm={3}>
              Address Line 2 (Optional)
            </Col>
            <Col sm={6}>
              <Form.Control type="text" placeholder="Address Line 2 (Optional)" name="address2" value={state.address2} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalCity">
            <Col sm={3}>
              City
            </Col>
            <Col sm={4}>
              <Form.Control type="text" placeholder="City" name="city" value={state.city} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalState">
            <Col sm={3}>
              State
            </Col>
            <Col sm={4}>
              <Form.Control as="select" placeholder="select" name="state" value={state.state} onChange={handleChange}>
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
              <Form.Control type="text" placeholder="Postal Code" name="postal" value={state.postal} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalCountry">
            <Col sm={3}>
              Country
            </Col>
            <Col sm={4}>
              <Form.Control as="select" placeholder="select" name="country" value={state.country} onChange={handleChange}>
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
        <Button type="submit" onClick={handleAddMember}  variant="success" active>
          Add Member
        </Button>
        <Button onClick={handleClose} variant="outline-dark">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}