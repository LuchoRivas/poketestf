import React from 'react';
import './App.css';
import { Container, Row, Col } from "react-bootstrap";
import Search from "./components/search";
class App extends React.Component {

  render(){
    return(
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h3 className="text-center">POKEDEX TEST</h3>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xs={6}>
              <Search></Search>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  };
};

export default App;
