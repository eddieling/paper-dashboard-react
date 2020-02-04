/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { Form } from "react-bootstrap";

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { AddUserModal } from "components/Modal/AddUserModal.jsx";
import { EditUserModal } from "components/Modal/EditUserModal.jsx";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { fetchUsers } from '../api/users';
import moment from 'moment';
import { listOfMonths } from 'variables/general';
import './Dashboard.css'


export const Dashboard = () => {

  const [allMembers, setAllMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedMember, setSelectedMember] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    filterMonth();
  }, [selectedMonth]);


  const getUsers = async () => {
    const result = await fetchUsers();
    const listOfMembers = result.data.data;
    listOfMembers.forEach(member => {
      member.registered = moment(member.registered).format('DD/MM/YYYY');
    })
    setAllMembers(listOfMembers);
    setFilteredMembers(listOfMembers);
  };

  const filterMonth = () => {
    let monthNum = listOfMonths.indexOf(selectedMonth) + 1;
    const filteredMembersList = allMembers.filter(member => ((member.birthdate).split("/"))[1] === monthNum.toString());
    if (selectedMonth === '') {
      setFilteredMembers(allMembers);
    }
    else {
      setFilteredMembers(filteredMembersList);
    }
  };

  const { SearchBar } = Search;
  const columns = [{
    dataField: 'fullname',
    text: 'Name'
  }, {
    dataField: 'birthdate',
    text: 'Birth Date'
  }, {
    dataField: 'phone',
    text: 'Phone'
  }, {
    dataField: 'gender',
    text: 'Gender'
  }, {
    dataField: 'role',
    text: 'Role'
  }, {
    dataField: 'address1',
    text: 'Address'
  }, {
    dataField: 'city',
    text: 'City'
  }, {
    dataField: 'state',
    text: 'State'
  }];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // console.log(`clicked on row with index: ${rowIndex}`);
      setSelectedMember(row);
      setEditModal(true);
    },
    onMouseEnter: (e, row, rowIndex) => {
      // console.log(`enter on row with index: ${rowIndex}`);
    }
  };

  const rowStyle = (row, rowIndex) => {
    return {
      cursor: 'pointer',
    };
  };

  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);

  const onHandleClose = () => {
    reset();
  };

  const reset = () => {
    setAllMembers([]);
    setFilteredMembers([]);
    setSelectedMember({});
    setTimeout(() => {
      getUsers();
    }, 800);
  };

  const handleSelectMonth = (e) => { setSelectedMonth(e.target.value) }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Members List</CardTitle>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  keyField="id"
                  data={filteredMembers}
                  columns={columns}
                  search
                >
                  {
                    props => (
                      <div>
                        <Form>
                          <Form.Row>
                            <Form.Group as={Col} controlId="formGridState" style={{ maxWidth: 250, height: 40 }}>
                              <SearchBar {...props.searchProps} style={{ width: 250 }} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formHorizontalEmail">
                              <Col sm={5}>
                                <Form.Control as="select" placeholder="select" name="month" value={selectedMonth} onChange={handleSelectMonth}>
                                  <option value="" >All months</option>
                                  {listOfMonths.map(i =>
                                    <option key={i} value={i}>{i}</option>
                                  )};
                                </Form.Control>
                              </Col>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                              <Button color="secondary" className="float-right" style={{ margin: 0 }} onClick={() => setAddModal(true)}>
                                Add Member
                                <i className="nc-icon nc-single-02" style={{ paddingLeft: 10 }} />
                              </Button>
                            </Form.Group>
                          </Form.Row>
                        </Form>

                        <BootstrapTable
                          {...props.baseProps}
                          bootstrap4
                          // striped
                          hover
                          rowEvents={rowEvents}
                          rowStyle={rowStyle}
                          pagination={paginationFactory()}
                          tdStyle={{ padding: '3px' }}
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <AddUserModal
          show={addModal}
          onHide={() => setAddModal(false)}
          handleClose={onHandleClose}
        />
        <EditUserModal
          show={editModal}
          selectedMember={selectedMember}
          onHide={() => setEditModal(false)}
          handleClose={onHandleClose}
        />

      </div>
    </>
  );
}

export default Dashboard;
