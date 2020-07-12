import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Row, Col, Pagination } from "react-bootstrap";
import { getPokemonByName, getPokemosnByType } from "../services/pokemonService";
import PokeCard from "./pokemonCard";
import MainPokeCard from "./mainPokemonCard";
import SearchAlert from "./alert";
import constants from "../constants";
import TypesDropdown from "./itemsDropdown";
import Swal from "./sweetalert"

export default function Main () {
    
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [pokemonTypeResult, setPokemonTypeResult] = useState({
        pokemon: []
    });
    const [pokemonTypeSelected, setPokemonTypeSelected] = useState('');
    const [isShiny, setShiny] = useState(false);
    const [showSweetAlert, setShowSweetAlert] = useState(false);
    
    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await getPokeByName();
        }
    };

    const onPokemonSearch = async () => {
        await getPokeByName();
    };

    const getPokeByName = async () => {
        error && await resetState();
        try {
            let searchValue = search;
            const pokemon_result = await getPokemonByName(searchValue);
            setPokemon(pokemon_result);
        }
        catch(err) {
          if(err.response && err.response.status === 500) {
            const error = 'No se encontraron resultados';
            pokemon && await resetState();
            setError(error);
          }
          else {
            // muestra el sweet alert de error
            setShowSweetAlert(true);
          }
        }
    };

    const resetState = async () => {
        setPokemon(null);
        setSearch(null);
        setError(null);
    };


    const toggleShiny = () => {
        setShiny(shiny => !shiny);
    };

    const onTypeSelect = async (pokeType) => {
        const alreadySelected = pokemonTypeSelected === pokeType;
        if(alreadySelected)
            return;
        try {
            setPokemonTypeSelected(pokeType);
            const result = await getPokemosnByType(pokeType);
            setPokemonTypeResult(result);
        }
        catch (err) {
            setShowSweetAlert(true);
        }
    };

    const test = (e) => {
        alert(`click en ${parseInt(e.target.id)}`)
    }

    const getPaginationItems = (totalPages) => {
        const paginationItems = [];
        let i = 1;
        while (paginationItems.length < totalPages) {
            paginationItems.push(
                    <Pagination.Item 
                        key={`pagination_item_${i}`}
                        id={i}
                        onClick={(e) => test(e)}>{i}</Pagination.Item>
                );
            i++
        }
        return paginationItems;
    }

    return(
        <div>
            <InputGroup className="mb-3 col-8 offset-2">
                <InputGroup.Prepend>
                    {/* dropdown */}
                    <TypesDropdown
                        items={constants.pokemonTypes || []}
                        onSelect={onTypeSelect}
                        dropdownTitle={'Tipos'}
                    ></TypesDropdown>
                    {/* panel de busqueda */}
                    <Button onClick={onPokemonSearch} className="border" variant="dark">Buscar</Button>
                </InputGroup.Prepend>
                <FormControl placeholder="ej: Pikachu" type="text" name="search" aria-describedby="basic-addon1" onChange={handleChange} onKeyPress={handleKeyDown} value={search}/>
            </InputGroup>
            {
                pokemon &&
                <Row>
                    <MainPokeCard isShiny={isShiny} pokemon={pokemon}></MainPokeCard>
                    <PokeCard toggleShiny={toggleShiny} isShiny={isShiny} pokemon={pokemon}></PokeCard>
                </Row>
            }
            {
                error &&
                    <SearchAlert errorMsg={error}></SearchAlert>
            }
            {
                pokemonTypeResult.pokemon.length > 0 && pokemonTypeResult.pokemon.map((x, i) => {
                    return(
                        <div>
                            <Row>
                                <Col>
                                    <p className="text-capitalize text-white">{x.pokemon.name}</p>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }
            {
                pokemonTypeResult.pokemon.length > 0 &&
                    <div>
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            {
                                pokemonTypeResult.pagination.totalPage > 1 && getPaginationItems(pokemonTypeResult.pagination.totalPage)
                            }
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
            }
            {/* Sweet alert de error */}
            <Swal
                showSweetAlert={showSweetAlert}
                setShowSweetAlert={setShowSweetAlert}
                title={'Error'}
                text={'Algo esta mal'}
                type={'error'}
                confirmButtonText={'Cerrar'}
            >
            </Swal>
        </div>
    )
};
