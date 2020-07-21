import React from 'react';
import { Card, Badge, Row, Col } from "react-bootstrap";

const MainPokemonCard = (props) => {
    const { pokemon, isShiny } = props;
    const color1 = pokemon.types[0].type.name;
    const female = pokemon.sprites.front_female;
    const imgCol = female ? 'col-6' : 'col-12'
    return (
        <React.Fragment>
            {
                props &&
                    <Col xs={9}>
                        <Card className={`pokemon-type-${color1}`}>
                            <Card.Body>
                                <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>
                                <div>
                                    {
                                        pokemon.types.map((pokemonType, i) =>
                                            <h6 key={`badge_${pokemonType.type.name}_${i}`} className="text-uppercase d-inline"><Badge className={`pokemon-type-${pokemonType.type.name}`} variant="dark">{pokemonType.type.name}</Badge>{' '}</h6>
                                        )
                                    }
                                </div>
                                <Card.Text>
                                    {
                                        pokemon.species[0].flavor_text
                                    }
                                </Card.Text>
                                <Row>
                                    <Col xs={12} className={"d-flex justify-content-center"}>
                                        <Card.Img hidden={isShiny} className="col-6" variant="top" alt="pokemon_image" src={`${pokemon.sprites.front_default}`} />
                                        {
                                            female &&
                                        <Card.Img hidden={isShiny || !female} className="col-6" variant="top" alt="pokemon_image" src={`${female || ''}`} /> 
                                        }
                                    </Col>
                                <Col xs={12} className={"d-flex justify-content-center"}>
                                    <Card.Img hidden={!isShiny} className="col-6" variant="top" alt="pokemon_image" src={`${pokemon.sprites.front_shiny}`} />
                                    <Card.Img hidden={!isShiny || !female} className="col-6" variant="top" alt="pokemon_image" src={`${pokemon.sprites.front_shiny_female || ''}`} />
                                    </Col>
                                </Row>
                            <Row hidden={female ? false : true}>
                                <p className={imgCol}>Macho</p>
                                    {
                                        female &&
                                    <p className={imgCol}>Hembra</p>
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
            }
        </React.Fragment>
    )
};

export default MainPokemonCard;
