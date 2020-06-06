import React, { Component } from 'react';
import './App.css';
import { Container, Button, Row, Col } from "react-bootstrap"
import { getPokemonByName } from "./services/pokemonService";

class App extends React.Component {
  state = undefined;
  async getPokemonByName(){
    getPokemonByName().then((res) => {
      this.setState(this.state = res);
    });
  }
  render(){
    return(
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h3 className="text-center">POKE TEST</h3>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button variant="dark" onClick={this.getPokemonByName.bind(this)}>Snorlax TEST</Button>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              {
                this.state &&
                <React.Fragment>
                  <h1>{this.state.name}</h1>
                  <img src={`${this.state.sprites.front_default}`}></img>
                </React.Fragment>
              }
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
