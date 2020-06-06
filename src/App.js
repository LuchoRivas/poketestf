import React from 'react';
import './App.css';
import { Container, Button, InputGroup, FormControl, Row, Col } from "react-bootstrap"
import { getPokemonByName } from "./services/pokemonService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    pokemon: undefined,
    search: undefined,
    error: undefined
  };

  async resetState() {
    this.setState({
      pokemon: undefined,
      search: undefined,
      error: undefined
    })
  }

  async getPokemonByName(search) {
    await this.resetState();
    try {
        const pokemon = await getPokemonByName(search);
        this.setState({ pokemon: pokemon });
    }
    catch(err) {
      console.log(err)
      if(err.response.status === 500) {
        const error = err.response.statusText;
        this.setState({ error: error });
      }
    }
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

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
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button onClick={(search) => this.getPokemonByName(this.state.search)} variant="outline-secondary">Seach</Button>
                </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.search}/>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              {
                this.state.pokemon &&
                <React.Fragment>
                  <h1 className="text-capitalize align-self-center">{this.state.pokemon.name}</h1>
                  <img alt="pokemon_image" src={`${this.state.pokemon.sprites.front_default}`}></img>
                </React.Fragment>
              }
              {
                this.state.error &&
                  <span>{'No se encontraron resultados'}</span>
              }
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
