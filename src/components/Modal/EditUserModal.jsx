import React, { useState, useEffect } from "react";

import {
  Modal,
  Row,
  Col,
  Button,
  Form
} from "react-bootstrap";

import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateUser } from 'api/users';

import { listOfStates, listOfMonths, listOfDays, listOfYears, listOfCountries } from  'variables/general';

export function EditUserModal(props) {

  const [state, setState] = useState({});
  const [modalTitle, setModalTitle] = useState('Member Information');
  const [editActive, setEditActive] = useState(false);

  useEffect(() => {
    console.log('props.selectedMember', props.selectedMember);
    let day='', month='', year='';
    if (props.selectedMember.birthdate){
      var date = (props.selectedMember.birthdate).split("/");
      day = date[0];
      month = date[1];
      year = date[2];
      month = listOfMonths[month-1];
      
    }

    setState({...props.selectedMember, birthDay: day, birthMonth: month, birthYear: year});
  }, [props]);




  const handleUpdateMember = (e) => {
    let birthdate = '';
    if (state.birthDay && state.birthMonth && state.birthYear) {
      let monthNum = listOfMonths.indexOf(state.birthMonth) + 1;
      birthdate = state.birthDay + '/' + monthNum + '/' + state.birthYear;
    }
    console.log('state.role', state.role)

    e.preventDefault();
    let newMember = {
      id: state._id,
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
    console.log('updating', newMember)
    updateUser(newMember);
    handleCloseAdd();
  }

  console.log('editusermodal state', state)

  const reset = () => {
    setState({});
    setModalTitle('Member Information');
    setEditActive(false);
  }

  const handleEdit = () => {
    setModalTitle('Edit Member Information');
    setEditActive(true);
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
          {modalTitle}
        </Modal.Title>

      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} as={Row} controlId="formHorizontalFullName">
            <Col sm={3}>
              Full Name
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} type="text" placeholder="Full Name" name="fullname" value={state.fullname} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col sm={3}>
              Email
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} type="text" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhoneNum">
            <Col sm={3}>
              Phone Number
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} type="text" placeholder="Phone Number" name="phone" value={state.phone} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhoneNum">
            <Col sm={3}>
              Gender
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} type="text" placeholder="Gender" name="gender" value={state.gender} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhoneNum">
            <Col sm={3}>
              Role
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} type="text" placeholder="Role" name="role" value={state.role} onChange={handleChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDateOfBirth">
            <Col sm={3}>
              Date of Birth
            </Col>
            <Col sm={2}>
              <Form.Control disabled={!editActive} as="select" name="birthDay" value={state.birthDay} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>{state.birthDay || 'Day'}</option>
                {listOfDays.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control disabled={!editActive} as="select"  name="birthMonth" value={state.birthMonth} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>{state.birthMonth || 'Month'}</option>
                {listOfMonths.map(i =>
                  <option key={i} value={i}>{i}</option>
                )};
              </Form.Control>
            </Col>
            <Col sm={2} style={{ paddingLeft: 0 }}>
              <Form.Control disabled={!editActive} as="select"  name="birthYear" value={state.birthYear} onChange={handleChange}>
                <option value="" style={{ display: 'none' }}>{state.birthYear || 'Year'}</option>
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
              <Form.Control disabled={!editActive} type="text" placeholder="Address Line 1" name="address1" value={state.address1} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddressLine2">
            <Col sm={3}>
              Address Line 2 (Optional)
            </Col>
            <Col sm={9}>
              <Form.Control disabled={!editActive} type="text" placeholder="Address Line 2 (Optional)" name="address2" value={state.address2} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalCity">
            <Col sm={3}>
              City
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} type="text" placeholder="City" name="city" value={state.city} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalState">
            <Col sm={3}>
              State
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} as="select" placeholder="select" name="state" value={state.state} onChange={handleChange}>
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
              <Form.Control disabled={!editActive} type="text" placeholder="Postal Code" name="postal" value={state.postal} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalCountry">
            <Col sm={3}>
              Country
            </Col>
            <Col sm={4}>
              <Form.Control disabled={!editActive} as="select" placeholder="select" name="country" value={state.country} onChange={handleChange}>
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
        {!editActive &&
          <Button type="submit" variant="success" active onClick={handleEdit}>
            Edit
            <FontAwesomeIcon icon={faPen} style={{marginLeft: 5}}/>
          </Button>
        }
        {editActive &&
          <Button type="submit" variant="success" active onClick={handleUpdateMember}>
            Save
            <FontAwesomeIcon icon={faSave} style={{marginLeft: 5}}/>
          </Button>
        }


        <Button onClick={handleClose} variant="outline-dark">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}