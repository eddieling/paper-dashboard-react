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
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { MyModal } from "components/Modal/Modal.jsx";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

// class Dashboard extends Component {
export const Dashboard = () => {

  const members = [
    {
      id: 0,
      fullname: 'Eddie Ling',
      email: 'eddie@email.com',
      birthdate: '10 June 1995',
      phone: '016-123-5343',
      registered: '9 January 2020'
    },
    {
      id: 1,
      fullname: 'Marcos Bob',
      email: 'bob@email.com',
      birthdate: '15 February 1998',
      phone: '012-123-1313',
      registered: '8 January 2020'
    },
    {
      id: 2,
      fullname: 'Poppy Leigh',
      email: 'poppy@email.com',
      birthdate: '7 March 1990',
      phone: '012-098-7543',
      registered: '8 January 2020'
    },
    {
      id: 3,
      fullname: 'Terry Sanders',
      email: 'terry@email.com',
      birthdate: '29 September 1980',
      phone: '010-113-3355',
      registered: '8 January 2020'
    },
  ]
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
      setModalShow(true);
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
                        <BootstrapTable
                          {...props.baseProps}
                          // striped
                          hover
                          rowEvents={rowEvents}
                          rowStyle={rowStyle}
                          pagination={ paginationFactory() }
                        />
                      </div>


                    )
                  }
                </ToolkitProvider>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <MyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

      </div>
    </>
  );
}

export default Dashboard;
