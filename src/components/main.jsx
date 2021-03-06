import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Row } from "react-bootstrap";
import { getPokemonByName } from "../services/pokemonService";
import PokeCard from "./pokemonCard";
import MainPokeCard from "./mainPokemonCard";
import SearchAlert from "./alert";
import Swal from "./sweetalert"
import { useEffect } from 'react';

export default function Main () {
    
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [isShiny, setShiny] = useState(false);
    const [showSweetAlert, setShowSweetAlert] = useState(false);
    const [triggerFromModal, setTriggerFromModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);

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
            setShowSweetAlert(true)
          }
        }
    };

    const resetState = async () => {
        setPokemon(null);
        setSearch('');
        setError(null);
    };


    const toggleShiny = () => {
        setShiny(shiny => !shiny);
    };

    useEffect(() => {
        if(triggerFromModal) {
            const searchOnModal = async () => {
                const pokemon_result = await getPokemonByName(search);
                setPokemon(pokemon_result);
                setTriggerFromModal(false);
                setModalShow(false);
            };
            searchOnModal();
        }
    }, [search, triggerFromModal]);

    const triggerSearchFromModal = async (pokemonEvolution) => {
        const value = pokemonEvolution;
        setTriggerFromModal(true);
        setSearch(value);
    };

    return(
        <div>
            <InputGroup className="mb-3 col-8 offset-2">
                <InputGroup.Prepend>
                    <Button onClick={onPokemonSearch} className="border" variant="dark">Buscar</Button>
                </InputGroup.Prepend>
                <FormControl placeholder="ej: Pikachu" type="text" name="search" aria-describedby="basic-addon1" onChange={handleChange} onKeyPress={handleKeyDown} value={search}/>
            </InputGroup>
            {
                pokemon &&
                <Row>
                    <MainPokeCard isShiny={isShiny} pokemon={pokemon}></MainPokeCard>
                    <PokeCard 
                        toggleShiny={toggleShiny}
                        isShiny={isShiny}
                        pokemon={pokemon}
                        triggerSearchFromModal={triggerSearchFromModal}
                        setModalShow={setModalShow}
                        modalShow={modalShow}></PokeCard>
                </Row>
            }
            {
                error &&
                    <SearchAlert errorMsg={error}></SearchAlert>
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
