import React from 'react';
import './App.css';
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Main from "./components/main";
class App extends React.Component {

  render(){
    return(
      <React.Fragment>
        <Navbar expand="lg" variant="dark" bg="dark" className="border-bottom">
          <Navbar.Brand href="#">Pokédex</Navbar.Brand>
        </Navbar>
        <Container>
          <Row className="d-flex justify-content-center mt-3">
            <Col xs={12}>
              <Main></Main>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  };
};

export default App;
