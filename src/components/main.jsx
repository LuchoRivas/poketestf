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
        id: 0,
        pagination: {
            skip: 0,
            take: 10,
            page: 0,
            total: 0,
            totalPage: 0
        },
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
            const result = await getPokemosnByType(pokeType, pokemonTypeResult.pagination);
            setPokemonTypeResult(result);
        }
        catch (err) {
            setShowSweetAlert(true);
        }
    };

    const test = async (e) => {
        let button_value = isNaN(parseInt(e.currentTarget.id)) ? e.currentTarget.id : parseInt(e.currentTarget.id);
        // const alreadySelected = pokemonTypeSelected === pokeType;
        // if(alreadySelected)
        //     return;
        try {
            // skip: 0,
            // take: 10,
            // page: 1,
            // total: 0,
            // totalPage: 0
            // const poke = pokemonTypeSelected;
            // setPokemonTypeSelected();
            let request = {
                ...pokemonTypeResult.pagination,
                page: button_value
            }
            const result = await getPokemosnByType(pokemonTypeSelected, request);
            setPokemonTypeResult(result);
        }
        catch (err) {
            setShowSweetAlert(true);
        }
    }

    const getPaginationItems = (totalPages) => {
        const paginationItems = [];
        let i = 0;
        while (paginationItems.length < totalPages) {
            paginationItems.push(
                    <Pagination.Item 
                        key={`pagination_item_${i}`}
                        id={i}
                        onClick={(e) => test(e)}>{i + 1}</Pagination.Item>
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
                            <Pagination.First
                            id='pagination_first'
                            onClick={(e) => test(e)} />
                            <Pagination.Prev
                            id='pagination_prev'
                            onClick={(e) => test(e)}/>
                            {
                                pokemonTypeResult.pagination.totalPage > 1 && getPaginationItems(pokemonTypeResult.pagination.totalPage)
                            }
                            <Pagination.Next
                            id='pagination_next'
                            onClick={(e) => test(e)} />
                            <Pagination.Last
                            id='pagination_last'
                            onClick={(e) => test(e)} />
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
