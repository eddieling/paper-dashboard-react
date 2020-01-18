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
  Col
} from "reactstrap";

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import { MyModal } from "components/Modal/Modal.jsx";
import { AddUserModal } from "components/Modal/AddUserModal.jsx";
import { EditUserModal } from "components/Modal/EditUserModal.jsx";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { fetchUsers } from '../api/users';
import moment from 'moment';

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Dashboard = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState({});

  useEffect(() => {
    getUsers();
  }, []);


  const getUsers = async () => {
    const result = await fetchUsers();
    const listOfMembers = result.data.data;
    listOfMembers.forEach(member => {
      member.registered = moment(member.registered).format('DD/MM/YYYY');
    })
    setMembers(listOfMembers);
    setLoading(false);
  };

  
  const { SearchBar } = Search;
  const columns = [{
    dataField: 'fullname',
    text: 'Name'
  }, {
    dataField: 'email',
    text: 'Email'
  }, {
    dataField: 'birthdate',
    text: 'Birth Date'
  }, {
    dataField: 'phone',
    text: 'Phone'
  }, {
    dataField: 'registered',
    text: 'Member Since'
  }];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
      setSelectedMember(row);
      setEditModal(true);
    },
    onMouseEnter: (e, row, rowIndex) => {
      console.log(`enter on row with index: ${rowIndex}`);
    }
  };

  const rowStyle = (row, rowIndex) => {
    return {
      cursor: 'pointer'
    };
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);

  const onHandleClose = () => {
    setMembers([]);
    setLoading(false);
    setTimeout(() => {
      getUsers();
    }, 300);
  };
  


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">All Members</CardTitle>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  keyField="id"
                  data={members}
                  columns={columns}
                  search
                >
                  {
                    props => (
                      <div>
                        <SearchBar {...props.searchProps} style={{ width: 200, height: 40 }} />
                        <Button color="secondary" className="float-right" style={{ margin: 0 }} onClick={()=> setAddModal(true)}>
                          Add Member
                          <i className="nc-icon nc-single-02" style={{ paddingLeft: 10 }}/>
                        </Button>
                        <BootstrapTable
                          {...props.baseProps}
                          bootstrap4
                          // striped
                          hover
                          rowEvents={rowEvents}
                          rowStyle={rowStyle}
                          pagination={paginationFactory()}
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <button onClick={getUsers}>click</button>
        <FontAwesomeIcon icon={faHome} />

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
