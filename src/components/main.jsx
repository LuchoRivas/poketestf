import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Row, Form } from "react-bootstrap";
import { getPokemonByName } from "../services/pokemonService";
import PokeCard from "./pokemonCard";
import MainPokeCard from "./mainPokemonCard";
import SearchAlert from "./alert";

 export default  function Main () {

    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setSearch(search);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.getPokemonByName(search)
        }
    }

    const getPokeByName = async (search) => {
        error && await resetState();
        try {
            const pokemon_result = await getPokemonByName(search);
            setPokemon(pokemon = pokemon_result);
        }
        catch(err) {
          if(err.response.status === 500) {
            const error = 'No se encontraron resultados';
            pokemon && await resetState();
            setError(error);
          }
        }
    };

    const resetState = async () => {
        setPokemon(null);
        setSearch(null);
        setError(null);
    };

        return(
            <React.Fragment>
                <InputGroup className="mb-3 col-8 offset-2">
                    <InputGroup.Prepend>
                        <Button onClick={(search) => getPokeByName(search)} className="border" variant="dark">Buscar</Button>
                    </InputGroup.Prepend>
                    <FormControl placeholder="ej: Pikachu" type="text" name="search" aria-describedby="basic-addon1" onChange={handleChange} onKeyPress={handleKeyDown} value={search}/>
                </InputGroup>
                {
                    pokemon &&
                    <Row>
                        <MainPokeCard pokemon={pokemon}></MainPokeCard>
                        <PokeCard pokemon={pokemon}></PokeCard>
                    </Row>
                }
                {
                    error &&
                        <SearchAlert errorMsg={error}></SearchAlert>
                }
            </React.Fragment>
        )
}
