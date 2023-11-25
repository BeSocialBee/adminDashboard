import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import AddForm from './form';
import DataTable from './dataTable';
import Home from './home'

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState('');

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

  const handleAdd = (newItem) => {
    const newItemWithId = { ...newItem, id: data.length + 1 };
    setData([...data, newItemWithId]);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ background: '#f8f9fa', height: '100vh', padding: '20px' }}>
          <Nav className="flex-column" variant="pills" defaultActiveKey="Home">
            <Nav.Item>
              <Nav.Link eventKey="Home" onClick={() => setSelectedNavItem('Home')}>
                HomePage
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="addForm" onClick={() => handleNavItemClick('addForm')}>
                Add User
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="dataTable" onClick={() => handleNavItemClick('dataTable')}>
                Data Table
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col md={10} style={{ padding: '20px' }}>
        {selectedNavItem === 'Homepage' && (
            <Row>
              <Col>
                <h2>Homepage</h2>
              </Col>
            </Row>
          )}
          {selectedNavItem === 'addForm' && (
            <Row>
              <Col>
                <h2>Add User</h2>
                <AddForm onAdd={handleAdd} />
              </Col>
            </Row>
          )}

          {selectedNavItem === 'dataTable' && (
            <Row>
              <Col>
                <h2>Data Table</h2>
                <DataTable data={data} />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;