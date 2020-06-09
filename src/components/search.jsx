import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { getPokemonByName } from "../services/pokemonService";
import PokeCard from "../components/pokemonCard";
import SearchAlert from "../components/alert";

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };
    
    state = {
        pokemon: undefined,
        search: '',
        error: undefined
    };

    handleChange(event) {
        this.setState({search: event.target.value});
    };

    async getPokemonByName(search) {
        this.state.error && await this.resetState();
        try {
            const pokemon = await getPokemonByName(search);
            this.setState({ pokemon: pokemon });
        }
        catch(err) {
          if(err.response.status === 500) {
            const error = 'No se encontraron resultados';
            this.state.pokemon && await this.resetState();
            this.setState({ error: error });
          }
        }
    };

    async resetState() {
        this.setState({
          pokemon: undefined,
          search: '',
          error: undefined
        })
    };


    render () {
        return(
            <React.Fragment>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button onClick={(search) => this.getPokemonByName(this.state.search)} className="border" variant="dark">Buscar</Button>
                    </InputGroup.Prepend>
                    <FormControl placeholder="ej: pikachu" type="text" name="search" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.search}/>
                </InputGroup>
                {
                    this.state.pokemon &&
                        <PokeCard pokemon={this.state.pokemon}></PokeCard>
                }
                {
                    this.state.error &&
                        <SearchAlert errorMsg={this.state.error}></SearchAlert>
                }
            </React.Fragment>
        )
    };
}

export default Search;
